import validateObjectId from "../utils/validators.js";
import transactionService from "../services/transactionService.js"
import accountService from "../services/accountService.js"
import mongoose from "mongoose";
import AppError from "../errorHandlers/appError.js";
const deposit = async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        const {accountId, amount} = req.body;

        if(amount<=0)throw new AppError("Invalid Amount",400);

        if(!validateObjectId(accountId)) throw new AppError("Invalid account ID",400);

        await session.withTransaction(async () => {
            const account = await accountService.getAccountById(accountId, session);
            if(!account)throw new AppError("Account not found", 404);
            if(req.user.id !==account.user.toString()) throw new AppError("Not Authorized to make transaction on this account", 403);
        
            await transactionService.deposit(account, amount, session);
        });

        return res.status(201).json({
            success: true,
            message: `Transaction Completed. $${amount} succesfully deposited in the account`
        })
    } finally {
        await session.endSession();
    }

}
const withdraw = async(req,res)=>{
    const session = await mongoose.startSession();

    try{
        const {accountId, amount} = req.body;
        if(amount<=0) throw new AppError("Invalid Amount",400);
        if(!validateObjectId(accountId)) throw new AppError("Invalid account ID",400);

        await session.withTransaction(async()=>{
            const account = await accountService.getAccountById(accountId,session);
            if(!account)throw new AppError("Account not found", 404);
            
            if(req.user.id !==account.user.toString()) throw new AppError("Not Authorized to make transaction on this account", 403);
            
            if(account.balance < amount) throw new AppError("Not Enough Balance", 400);
            
            await transactionService.withdraw(account, amount, session);
        });

        return res.status(201).json({
            success: true,
            message: `Transaction Completed. $${amount} succesfully withdrawn.`
        })
    } finally {
        await session.endSession();
    }
    
}
const transfer = async(req,res)=>{
    const session = await mongoose.startSession();

    try{
        const {fromAccountId,toAccountId, amount} = req.body;

        if(amount<=0) throw new AppError("Invalid Amount",400);
      
        if(!validateObjectId(fromAccountId) || !validateObjectId(toAccountId)) throw new AppError("Invalid account ID",400);

        await session.withTransaction(async()=>{
            const accounts = await accountService.getAccounts(fromAccountId,toAccountId,session);
            if (accounts.length !== 2) throw new AppError("Account not found", 404);

            const fromAccount = accounts.find(a=>a._id.equals(fromAccountId))
            if(req.user.id!== fromAccount.user.toString()) throw new AppError("Not Authorized to make transaction on this account", 403);
        

            if(fromAccount.balance < amount) throw new AppError("Not Enough Balance", 400);
            
           await transactionService.transfer(fromAccountId,toAccountId, amount, session);
        });

        return res.status(201).json({
            success: true,
            message: `Transaction Completed. $${amount} succesfully transfered.`
        })
    } finally {
        await session.endSession();
    }
}
const getAllTransactions = async(req,res)=>{
  
    const accountId =req.params.accountId

    if(!validateObjectId(accountId)) throw new AppError("Inavlid Account ID.",400)
    
    const account = await accountService.getAccountById(accountId);
    if(req.user.id !== account.user.toString()) throw new AppError("Not Authorized to make transaction on this account", 403);

    const transactions = await transactionService.getAllTransactions(accountId);

    return res.status(200).json({
        success: true,
        data: transactions
    })
}

export {deposit,withdraw,transfer,getAllTransactions};
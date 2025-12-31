import validateObjectId from "../utils/validators.js";
import transactionService from "../services/transactionService.js"
import accountService from "../services/accountService.js"
import mongoose from "mongoose";

const deposit = async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        const {accountId, amount} = req.body;

        if(amount<=0){
            return res.status(400).json({
                success: false,
                message: "Amount must be positive"
            })
        }

        if(!validateObjectId(accountId)){
            return res.status(400).json({
                success: false,
                message: "Invalid account ID"
            })
        }

        await session.withTransaction(async () => {
            const account = await accountService.getAccountById(accountId, session);
            if (!account) {
                throw new Error("Account not found");
            }

            await transactionService.deposit(account, amount, session);
        });

        session.endSession();

        return res.status(201).json({
            success: true,
            message: "Transaction Completed"
        })

    }catch (error) {
        session.endSession();
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: error.message || "Internal server error" 
        });
  }

}
const withdraw = async(req,res)=>{
    
}
const transfer = async(req,res)=>{
    
}
const getAllTransactions = async(req,res)=>{
    
}

export {deposit,withdraw,transfer,getAllTransactions};
import { withdraw } from "../controllers/transactionController.js";
import AccountModel from "../models/account.js"

const createAccount = async (user) => {
    const account = new AccountModel({
        user: user
    })   
    
    await account.save();
    return account;
}

const getAllAccounts = async (userId) => {
    return await AccountModel.find(
        { user: userId },
        {_id:1,balance:1}
    )
    .populate("user", "username")
    .lean();
};

const getAccountById = async (accountId,session) => {
    return await AccountModel.findById(accountId,{_id:1,balance:1,user:1}).session(session);
}

const deleteAccount = async(accountId)=>{
    return await AccountModel.findByIdAndDelete(accountId);
}

const updateBalance = async(id,amount,session,isWithdraw=false)=>{
    let account;
    if(isWithdraw){
        account = await AccountModel.findOneAndUpdate({
            _id: id,
            balance: { $gte: Math.abs(amount) }
            },
            {
                $inc: { balance: amount }
            },
            {
                new: true,
                session
            }
        );

    }else{
        account = await AccountModel.findOneAndUpdate(
            { _id: id },
            { $inc: { balance: amount } },
            { new: true, session }
        );
    }
    if(!account){
        throw new Error("Insufficient balance or account not found");
    }

    return account;

}
const getAccounts = async(fromAccountId,toAccountId,session)=>{
    return await AccountModel.find({
        _id: {$in:[fromAccountId,toAccountId]}
    }).session(session)
}
const accountService = {createAccount,getAllAccounts,getAccountById,deleteAccount, updateBalance,getAccounts}

export default accountService
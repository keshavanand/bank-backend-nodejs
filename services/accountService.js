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
    return await AccountModel.findById(accountId,{_id:1,balance:1}).session(session);
}

const deleteAccount = async(accountId)=>{
    return await AccountModel.findByIdAndDelete(accountId);
}

const updateBalance = async(id,amount,session)=>{
    await AccountModel.findOneAndUpdate(
        { _id: id },
        { $inc: { balance: amount } },
        { new: true, session }
    );

}
const accountService = {createAccount,getAllAccounts,getAccountById,deleteAccount, updateBalance}

export default accountService
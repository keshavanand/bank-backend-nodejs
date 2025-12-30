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

const getAccountById = async (accountId) => {
    return await AccountModel.findById(accountId,{_id:1,balance:1});
}

const deleteAccount = async(accountId)=>{
    return await AccountModel.findByIdAndDelete(accountId);
}
const accountService = {createAccount,getAllAccounts,getAccountById,deleteAccount}

export default accountService
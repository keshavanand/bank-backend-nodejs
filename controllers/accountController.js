import accountService from "../services/accountService.js"
import userService from "../services/userService.js"
import validateObjectId from "../utils/validators.js"
import AppError from "../errorHandlers/appError.js"
const createAccount = async(req,res)=>{
    
    const userId = req.user.id
    const user = await userService.getUserById(userId)
    if(!user) throw new AppError("User not found",203)
    
    const createdAccount = accountService.createAccount(user);
    if(createAccount){
        return res.status(201).json({
            success: true,
            message: "Account created."
        })
    }
}
const getAllAccounts = async(req,res)=>{
    const userId = req.user.id
    const user = await userService.getUserById(userId)
    if(!user) throw new AppError("User not found",203)

    const userAccounts = await accountService.getAllAccounts(userId);
    if(userAccounts){
        return res.status(200).json({
            success: true,
            data: userAccounts
        })
    }
    
}

const getAccountById = async (req, res) => {
    const id = req.params.accountId;
    if (!validateObjectId(id)) throw new AppError("Invalud account ID",400)

    const account = await accountService.getAccountById(id);

    if (!account)  throw new AppError("Account not found",404)

    return res.status(200).json({
        success: true,
        data: account
    });
};

const deleteAccount = async (req, res) => {
    const id = req.params.accountId;

    if (!validateObjectId(id)) throw new AppError("Invalud account ID",400)

    const account = await accountService.deleteAccount(id);
    
    if (!account)  throw new AppError("Account not found",404)

    return res.status(200).json({
        success: true,
        message: `Account deleted successfully`
    })
};

export {createAccount,getAllAccounts,getAccountById,deleteAccount};
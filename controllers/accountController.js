import accountService from "../services/accountService.js"
import userService from "../services/userService.js"
import validateObjectId from "../utils/validators.js"

const createAccount = async(req,res)=>{
    try{
        const userId = req.user.id
        const user = await userService.getUserById(userId)
        if(!user){
            return res.status(203).json({
                success: false,
                message: "User not found."
            })
        }
        
        const createdAccount = accountService.createAccount(user);
        if(createAccount){
            return res.status(201).json({
                success: true,
                message: "Account created."
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}
const getAllAccounts = async(req,res)=>{
     try{
        const userId = req.user.id
        const user = await userService.getUserById(userId)
        if(!user){
            return res.status(203).json({
                success: false,
                message: "User not found."
            })
        }
        
        const userAccounts = await accountService.getAllAccounts(userId);
        if(userAccounts){
            return res.status(200).json({
                success: true,
                data: userAccounts
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}

const getAccountById = async (req, res) => {
    const id = req.params.accountId;
    if (!validateObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid account ID"
        });
    }

    try {
        const account = await accountService.getAccountById(id);

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: account
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const deleteAccount = async (req, res) => {
    const id = req.params.accountId;

    if(!validateObjectId(id)){
         return res.status(400).json({
            success: false,
            message: "Invalid account ID"
        });
    }
    try{
        const account = await accountService.deleteAccount(id);
        if(!account){
            return res.status(200).json({
                success: false,
                message: `Account not found`
            })
        }
        return res.status(200).json({
            success: true,
            message: `Account deleted successfully`
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
                    success: false,
                    message: error.message || "Internal Server Error"
                });
    }
    
};

export {createAccount,getAllAccounts,getAccountById,deleteAccount};
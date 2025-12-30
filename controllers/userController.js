import userService from "../services/userService.js";
import validateObjectId from "../utils/validators.js"

const registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const loginUser = async (req,res)=>{

}

const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    try {
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    try {
        const updatedUser = await userService.updateUser(id, req.body);

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!validateObjectId(id)){
         return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
    try{
        const user = await userService.getUserById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await userService.deleteUser(id);

        return res.status(200).json({
            success: true,
            message: `User ${user.name} deleted successfully`
        })
    }catch(error){
        return res.status(500).json({
                    success: false,
                    message: error.message || "Internal Server Error"
                });
    }
    
};


export { registerUser, loginUser, getUserById, updateUser, deleteUser };

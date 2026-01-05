import userService from "../services/userService.js";
import validateObjectId from "../utils/validators.js"
import AppError from "../errorHandlers/appError.js"

const getUserById = async (req, res) => {
    const id = req.user.id;
    if (!validateObjectId(id)) throw new AppError("Invalid user ID",400)
        
    const user = await userService.getUserById(id);

    if (!user) throw new AppError("User not found", 404)

    return res.status(200).json({
        success: true,
        user
    });


};

const updateUser = async (req, res) => {
    const id = req.user.id;

    if (!validateObjectId(id)) throw new AppError("Invalid user ID",400)

    const updatedUser = await userService.updateUser(id, req.body);

    if (!updatedUser) throw new AppError("User not found", 404)

    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser
    });

};

const deleteUser = async (req, res) => {
    const id = req.user.id;

    if (!validateObjectId(id)) throw new AppError("Invalid user ID",400)


    const user = await userService.deleteUser(id);
    if (!user) throw new AppError("User not found", 404)

    return res.status(200).json({
        success: true,
        message: `User ${user.name} deleted successfully`
    })
    
};


export {getUserById, updateUser, deleteUser};

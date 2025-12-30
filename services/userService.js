import UserModel from "../models/user.js";

const getUserById = async(id)=>{
  return await UserModel.findById(id).exec();  
}

const updateUser = async (id, data) => {
    return await UserModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteUser = async(id)=>{
    return await UserModel.findByIdAndDelete(id);
}

const userService = {getUserById, updateUser,deleteUser };

export default userService;

import UserModel from "../models/user.js";

const registerUser = async (user) => {
    return await UserModel.create(user);
};

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

const userService = { registerUser, getUserById, updateUser,deleteUser };

export default userService;

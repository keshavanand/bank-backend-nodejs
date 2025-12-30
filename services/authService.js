import UserModel from "../models/user.js";

const register = async (username,email,password,role) => {
    const newUser = new UserModel({
        username,
        email,
        password,
        role
    })
    return await newUser.save(); 
};

const checkExistingUser = async(username,email)=>{
    return await UserModel.findOne({$or:[{username},{email}]});
}

const userExists = async(username)=>{
    return await UserModel.findOne({username});
}

const authService = {register,checkExistingUser,userExists};
export default authService;
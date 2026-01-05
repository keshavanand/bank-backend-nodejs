import authService from "../services/authService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import AppError from "../errorHandlers/appError.js";

const register = async (req, res) => {

    const {username,email,password, role} = req.body;

    const checkExistingUser = await authService.checkExistingUser(username,email);

    if(checkExistingUser) throw new AppError("User already exist check username and email.",400)
        
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const user = await authService.register(username,email,hashPassword,role||'user')

    if(user){
        return res.status(201).json({
                    success: true, 
                    message: "User registered successfully",
                });
    }
};

const login = async (req,res)=>{

    const {username, password} = req.body

    const user = await authService.userExists(username);

    if(!user) throw new AppError("Username not found",400)

    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch) throw new AppError("Invalid credintals",400)

    const accessToken = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET_KEY,
    {
        expiresIn: "15m"
    })

    return res.status(200).json({
        success: true,
        message: "Login successfull",
        accessToken
    })
}

export {register,login};
import authService from "../services/authService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {
        const {username,email,password, role} = req.body;

        const checkExistingUser = await authService.checkExistingUser(username,email);

        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist check username and email."
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await authService.register(username,email,hashPassword,role||'user')

        if(user){
            return res.status(201).json({
                        success: true, 
                        message: "User registered successfully",
                    });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const login = async (req,res)=>{
    try{
        const {username, password} = req.body

        const user = await authService.userExists(username);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Username not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credintals"
            })
        }

        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
            },
            process.env.JWT_SECRET_KEY,
        {
            expiresIn: "15m"
        })

        return res.status(200).json({
            success: true,
            message: "Login successfull",
            accessToken
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export {register,login};
import jwt from "jsonwebtoken";
import userService from "../services/userService.js"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = userService.getUserById(decoded.id);
        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }else{
            req.user = decoded;
            next();
        }
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.name === "TokenExpiredError"
                ? "JWT token expired. Please login again."
                : "Invalid token"
        });
    }
};

export default authMiddleware;

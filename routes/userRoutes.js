import { Router } from "express";
import { registerUser, loginUser, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const userRoute = Router();

userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser);
userRoute.get("/:userId",getUserById);
userRoute.put("/:userId",updateUser);
userRoute.delete("/:userId",deleteUser);

export default userRoute;
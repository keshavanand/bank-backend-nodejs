import { Router } from "express";
import {getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const userRoute = Router();

userRoute.get("",getUserById);
userRoute.put("",updateUser);
userRoute.delete("",deleteUser);

export default userRoute;
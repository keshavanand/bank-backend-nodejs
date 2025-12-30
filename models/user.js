import mongoose  from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Name is requires"],
        minLength: [4,"Minmum length is 4"],
        maxLength: [24, "Max length is 24"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, 
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Pleas enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},{timestamps:true})

const UserModel = mongoose.model("User",userSchema);

export default UserModel;
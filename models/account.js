import mongoose from "mongoose";
import { Schema } from "mongoose";

const accountSchema = new Schema({
    balance:{
        type: Number,
        default: 0.00,
        min: [0,"Balance cannot be negative"]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
  { timestamps: true }
)

const accountModel = mongoose.model("Account", accountSchema);

export default accountModel;
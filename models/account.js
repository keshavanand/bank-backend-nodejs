import mongoose from "mongoose";
import { Schema } from "mongoose";
import { CURRENCY_ENUM } from "../enums/account.enums.js";

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
    },
    currency:{
        type: String,
        required: true,
        enum: Object.values(CURRENCY_ENUM),
        default: CURRENCY_ENUM.CAD
    }
},
  { timestamps: true }
)

const accountModel = mongoose.model("Account", accountSchema);

export default accountModel;
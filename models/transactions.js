import mongoose, {Schema} from "mongoose";
import { TRANSACTION_TYPE, TRANSACTION_STATUS } from "../enums/transaction.enums.js";

const transactionSchema = new Schema(
{
    fromAccount: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: function () {
            return this.type === TRANSACTION_TYPE.TRANSFER ||
                   this.type === TRANSACTION_TYPE.WITHDRAW;
        },
        validate: {
            validator: function () {
                if (this.type !== TRANSACTION_TYPE.TRANSFER) return true;
                return !this.fromAccount.equals(this.toAccount);
            },
            message: "From and To accounts must be different"
    }
    },
    toAccount: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: function () {
            return this.type === TRANSACTION_TYPE.TRANSFER ||
                   this.type === TRANSACTION_TYPE.DEPOSIT;
        }
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(TRANSACTION_TYPE)
    },
    amount: {
        type: Number, 
        required: true,
        min: [0.01, "Amount must be greater than zero"]
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(TRANSACTION_STATUS),
        default: TRANSACTION_STATUS.PENDING
    }
},
{ timestamps: true }
);
const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
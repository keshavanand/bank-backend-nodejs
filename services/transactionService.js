import TransactionModel from "../models/transactions.js";
import transactionModel from "../models/transactions.js"
import accountService from "./accountService.js";
import { TRANSACTION_TYPE, TRANSACTION_STATUS } from "../enums/transaction.enums.js";

const deposit = async(account,amount,session)=>{
    await accountService.updateBalance(account._id,amount,session);

    const transaction = new TransactionModel({
        toAccount: account._id,
        type: TRANSACTION_TYPE.DEPOSIT,
        amount: amount,
        status: TRANSACTION_STATUS.SUCCESS
    })

    await transaction.save({session});
}

const transactionService = {deposit}
export default transactionService;
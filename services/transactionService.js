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
const withdraw = async(account,amount,session)=>{
    await accountService.updateBalance(account._id,-amount,session,true);
    const transaction = new TransactionModel({
        fromAccount: account._id,
        type:  TRANSACTION_TYPE.WITHDRAW,
        amount: amount,
        status: TRANSACTION_STATUS.SUCCESS
    })

    await transaction.save();
}
const transfer = async(fromAccountId,toAccountId,amount,session)=>{
    await accountService.updateBalance(fromAccountId,-amount,session)
    await accountService.updateBalance(toAccountId,amount,session)

    const transaction = new TransactionModel({
        fromAccount: fromAccountId,
        toAccount: toAccountId,
        type: TRANSACTION_TYPE.TRANSFER,
        amount: amount,
        status: TRANSACTION_STATUS.SUCCESS
    })
    await transaction.save();
}
const getAllTransactions = async(accountId)=>{
    return await TransactionModel.find({
       $or:[
        {fromAccount: accountId},
        {toAccount: accountId}
       ]
    }).sort({createdAt:-1})
}
const transactionService = {deposit, withdraw,transfer, getAllTransactions}
export default transactionService;
import express from "express"; 
import {depositMoney, withdrawMoney,transferMoney, getAllTransactions} from "../controllers/transactionController.js"

const transactionRouter = express.Router()

transactionRouter.post("/deposit",depositMoney);
transactionRouter.post("/withdraw",withdrawMoney);
transactionRouter.post("/transfer",transferMoney);
transactionRouter.get("/:accountId",getAllTransactions);

export default transactionRouter;
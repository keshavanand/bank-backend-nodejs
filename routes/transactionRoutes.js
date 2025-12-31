import express from "express"; 
import {deposit, withdraw,transfer, getAllTransactions} from "../controllers/transactionController.js"

const transactionRouter = express.Router()

transactionRouter.post("/deposit",deposit);
transactionRouter.post("/withdraw",withdraw);
transactionRouter.post("/transfer",transfer);
transactionRouter.get("/:accountId",getAllTransactions);

export default transactionRouter;
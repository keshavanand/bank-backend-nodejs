import express from "express"; 
import {deposit, withdraw,transfer, getAllTransactions, transferInternational} from "../controllers/transactionController.js"

const transactionRouter = express.Router()

transactionRouter.post("/deposit",deposit);
transactionRouter.post("/withdraw",withdraw);
transactionRouter.post("/transfer",transfer);
transactionRouter.get("/:accountId",getAllTransactions);
transactionRouter.post("/transfer_international",transferInternational)

export default transactionRouter;
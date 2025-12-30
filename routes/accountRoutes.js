import { Router } from "express";
import { createAccount, getAllAccounts, getAccountById, deleteAccount} from "../controllers/accountController.js";
const accountRouter = Router();

accountRouter.post("/:userId",createAccount);
accountRouter.get("/:userId",getAllAccounts);
accountRouter.get("/:accountId",getAccountById);
accountRouter.delete("/:accountId",deleteAccount);

export default accountRouter;
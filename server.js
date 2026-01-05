import express from "express";
import connectDb from "./db/mongoDbInstance.js";
import { configDotenv } from "dotenv";
import userRoute from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import authRouter from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import morgan from "morgan";
import logger from "./logger/logger.js";
configDotenv();
connectDb();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(morgan('dev'))

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",authMiddleware, userRoute)
app.use("/api/v1/accounts",authMiddleware, accountRouter)
app.use("/api/v1/transactions",authMiddleware, transactionRouter)

app.use(errorHandlerMiddleware)

app.listen(PORT,()=>{
    logger.info(`Server Starterd at ${PORT}`)
})
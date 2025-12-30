import express from "express";
import connectDb from "./db/mongoDbInstance.js";
import { configDotenv } from "dotenv";
import userRoute from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

configDotenv();
connectDb();

const PORT = process.env.PORT
const app = express();

app.use(express.json());

app.use("/api/v1/users",userRoute)
app.use("/api/v1/accounts", accountRouter)
app.use("/api/v1/transactions",transactionRouter)

app.listen(PORT,()=>{
    console.log(`Server Starterd at ${PORT}`)
})
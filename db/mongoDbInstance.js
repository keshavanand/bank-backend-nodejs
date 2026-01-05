import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import logger from "../logger/logger.js"
configDotenv();

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        logger.info("Mongo DB connected Succesfully")
    }catch (error){
        logger.error("Connection failed")
    }
}

export default connectDb;
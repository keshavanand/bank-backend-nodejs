import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import logger from "../logger/logger.js"
configDotenv();

const connectDb = async()=>{
    try{
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_DB_URL);
        logger.info("Mongo DB connected Succesfully")
    }catch (error){
        logger.error(`Connection failed: Error: ${error}`)
    }
}

export default connectDb;
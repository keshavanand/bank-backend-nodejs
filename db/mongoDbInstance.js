import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Mongo DB connected Succesfully");
    }catch (error){
        console.log("Connection failed");
    }
}

export default connectDb;
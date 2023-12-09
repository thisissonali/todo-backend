import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DB = process.env.MONGO_URI

export const connectDB = () => {
 
    mongoose.connect(DB, {
        dbName: "todobackend"
    }).then(() => {
        console.log("Connection successful");
    }).catch((err) => console.log(err));
    
}


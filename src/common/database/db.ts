import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

const DB_URL: string = process.env.DB_URL || '';

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, {
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

import mongoose from "mongoose";
import logger from "./logger";

export const connectDB = async () => {
    const db = process.env.DB_URI as string


    try {
        await mongoose.connect(db);
        logger.info("MongoDB Connected...");
    } catch (error: any) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

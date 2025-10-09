import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        // Log a concise success message
        console.log(`\nMongoDB connected — host: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        // Log the error but do NOT exit the process here.
        // Let the caller decide whether to stop the app or continue in degraded mode.
        console.error(
            "MONGODB connection error:",
            error && error.message ? error.message : error
        );
        throw error;
    }
};

export default connectDB;
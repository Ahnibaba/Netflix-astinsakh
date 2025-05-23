import mongoose from "mongoose"
import { ENV_VARS } from "./envVars.js"


export const connectDB = async () => {
    try {

        mongoose.connection.on("connected", () => {
          console.log("Database Connected")
        })
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("Error connecting to mongodb: " + error.message);
        process.exit(1) // 1 means there was an error, 0 means success 

    }
}



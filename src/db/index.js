import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        //checking what's inside connectionInstance
        console.log(connectionInstance)

        console.log('\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}');
        //this .connection.host is a instance of object connectionInstance

    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
        //learn different types of error
    }
}

export default connectDB 
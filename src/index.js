require('dotenv').config()

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import connectDB from "./db";


connectDB()





/*  FIRST APPROACH
import express from "express"
const app=express()

;(async ()=>{ //this semicolon is for cleaning purposes
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR: ",error);
        throw error
    }
})()
*/
// require('dotenv').config()

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import connectDB from "./db";

// connectDB()
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
*/ //one way

//other way
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js";
dotenv.config({
    path: './env'
})

// Try to connect to MongoDB, but don't let a failed connection crash the whole app.
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App is listening on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.warn("WARNING: MongoDB connection failed — starting server in degraded mode.");
        console.warn(error && error.message ? error.message : error);
        // Start server anyway so developers can continue working on non-DB features.
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App (degraded) is listening on port ${process.env.PORT || 8000}`);
        });
    });

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
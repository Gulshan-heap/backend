import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({
    limit: "20kb" //body size limit (can be increased as per requirement)
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));  //to handle form data

app.use(express.static("public")); //to serve static files like images ,css files,js files

app.use(cookieParser());


export { app };
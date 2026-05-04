import express from "express";
import mongoose from "mongoose";
import dns from "dns";
import userRouter from "./router/uerRouter.js";
import productRouter from "./router/productRouter.js";
import authorize from "./lib/jwtMiddleware.js";
import cors from "cors"
import dotenv from 'dotenv'


dns.setServers(["1.1.1.1","8.8.8.8"]);

dotenv.config()

const mongoDbUri=process.env.MONGO_URI;

mongoose.connect(mongoDbUri).then(
    ()=>{
        console.log("Connect to MongoDb")
    }

).catch(
    ()=>{
    console.log(" Error connecting to MongoDB");
    
});

let app=express();

app.use(express.json());
app.use(authorize);
app.use(cors());

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);


app.listen(3000,()=>{
    console.log("hello world...")
});
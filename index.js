import express from "express";
import mongoose from "mongoose";
import dns from "dns";
import userRouter from "./router/uerRouter.js";
import productRouter from "./router/productRouter.js";
import authorize from "./lib/jwtMiddleware.js";


dns.setServers(["1.1.1.1","8.8.8.8"]);


const mongoDbUri="mongodb+srv://admin:12345@cluster0.tlltd3s.mongodb.net/?appName=Cluster0";

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

app.use("/users",userRouter);
app.use("/products",productRouter);


app.listen(3000,()=>{
    console.log("hello world...")
});
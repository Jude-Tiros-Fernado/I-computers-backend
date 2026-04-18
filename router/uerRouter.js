import express from "express";
import { createUser, logingUser } from "../controller/userControler.js";

const userRouter=express.Router();

userRouter.post("/",createUser);
userRouter.post("/loging",logingUser);

export default userRouter;



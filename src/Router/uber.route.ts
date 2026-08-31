import express, { Request, Response } from "express"
import UserModel from "../models/User.model";
import { Login, Register } from "../Controllers/uber.controller";
import { auth,AuthRequest } from "../Middlewares/auth.middleware";
const router=express.Router()
router.post("/register",Register)
router.post("/login",Login)
router.get("/me",auth,async(req :AuthRequest ,res :Response)=>{
  res.json({userId:req.userId})
})





export default router

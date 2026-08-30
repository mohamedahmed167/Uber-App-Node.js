import express from "express"
import UserModel from "../models/User.model";
import { Login, Register } from "../Controllers/uber.controller";
const router=express.Router()
router.post("/register",Register)
router.post("/login",Login)
export default router

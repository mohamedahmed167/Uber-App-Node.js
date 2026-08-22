import express from "express"
import UserModel from "../models/User.model";
import { Register } from "../Controllers/uber.controller";
const router=express.Router()
router.post("/register",Register)
export default router

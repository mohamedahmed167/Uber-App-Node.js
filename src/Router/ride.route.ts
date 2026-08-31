import express from "express"
import { auth } from "../Middlewares/auth.middleware"
import RideModel from "../models/Ride.model"
import { newRide } from "../Controllers/Ride.controller"



   const router =express.Router()
// MiddleWare
router.use(auth)



// Routes
router.post("/",newRide)
export default router

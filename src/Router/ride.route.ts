import express from "express"
import { auth } from "../Middlewares/auth.middleware"
import RideModel from "../models/Ride.model"
import { getRide, getRideById, newRide } from "../Controllers/Ride.controller"

   const router =express.Router()
// MiddleWare
router.use(auth)


// Routes
router.post("/",newRide)
router.get("/",getRide)
router.get("/:id",getRideById)

// accept ride
// router.put("/:id/accept",acceptRide)


export default router

import express from "express"
import { auth } from "../Middlewares/auth.middleware"
import RideModel from "../models/Ride.model"
import { acceptRide, canceledRide, completedRide, getRide, getRideById, newRide, RideVaildation, startRide } from "../Controllers/Ride.controller"

   const router =express.Router()
// MiddleWare
router.use(auth)


// Routes
router.post("/", RideVaildation, newRide);
router.get("/",getRide)
router.get("/:id",getRideById)

// accept ride
router.put("/:id/accept",acceptRide)

router.put("/:id/start",startRide)

router.put("/:id/compelet",completedRide)

router.put("/:id/cancel",canceledRide)


export default router

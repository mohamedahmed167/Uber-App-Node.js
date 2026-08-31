import { Request, Response } from "express";
import { AuthRequest } from "../Middlewares/auth.middleware";
import RideModel from "../models/Ride.model";


export const newRide =async(req:AuthRequest,res:Response)=>{
  try{
    const {pickupLocation ,dropoffLocation,name,phone}=req.body;
    if(!pickupLocation  ||typeof pickupLocation !="string" || !dropoffLocation ||typeof dropoffLocation !="string" ){
      return res.status(400).json({message:'pickup and dropoff are required and must be string'})
    }
    const ride =new RideModel({
      name:name.trim().toLowerCase(),
      phone:phone.trim(),
      passengerId:req.userId,
      pickupLocation:pickupLocation.trim(),
      dropoffLocation:dropoffLocation.trim(),
      status:"requested"
    })
    await ride.save()
    res.status(201).json(ride)
  }catch(error){
    console.log("error in create Ride",error)
    res.status(500).json({message:"error creating ride",error:error instanceof Error ?  error.message :"Unkown Error"})
  }
}

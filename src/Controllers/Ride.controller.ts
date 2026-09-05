import { Request, Response } from "express";
import { AuthRequest } from "../Middlewares/auth.middleware";
import RideModel from "../models/Ride.model";
import DriverModel from "../models/Driver.model";

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


export const getRide =async(req:AuthRequest ,res:Response)=>{
try{
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const rides =await RideModel.find({
    $or : [
      {passengerId:req.userId},
      {driverId:req.userId}
    ]
  }).sort({createdAt :-1}).populate("passengerId", "name email")
  .populate("driverId", "name email")


  res.status(201).json({ success:true  ,message:"successfully to get all Rides",data:rides})

}catch(error){
  console.log("there is error in get Ride",error)
  res.status(500).json({ error: error instanceof Error ? error.message : "Unkown"})
}
}


export const getRideById =async(req:AuthRequest ,res:Response)=>{
  try{

    const id =req.params.id;
    const ride = await RideModel.findById(id)
      .populate("passengerId", " name email")
      .populate("driverId", " name email");

    if(!ride){
      return res.status(404).json({message:"Ride not found"})
    }
    const isPassenger =ride.passengerId?._id?.toString() === req.userId
    const isDriver =ride.driverId?._id.toString() === req.userId
    if(!isPassenger && !isDriver){
      return res.status(403).json({message:"you are not authorizaed to view this ride"})
    }
    res.status(200).json({ success:true  ,message:"successfully get ride",data:ride})
  }catch(error){
    console.log("there is error in get ride by id",error)
    res.status(500).json({error:error instanceof Error ? error.message :"Unkown"})
  }
}


export const acceptRide =async(req : AuthRequest ,res:Response)=>{
try{
  const {id}=req.params
  const driver = await DriverModel.findOne({ userId: req.userId as string });
  if(!driver){
    return res.status(403).json({message:"only driver can accept rides"})
  }
  if(!driver.isAvailable){
    return res.status(400).json({message:"you are currently not available to accept rides"})
  }
  const ride =await RideModel.findById(id)
  if(!ride){
    return res.status(400).json({message:"Ride is not found"})
  }
  if(ride.status != "requested"){
    return res.status(400).json({message:"Ride is not available for acceptance"})
  }
  if(ride.driverId ){
    return res.status(400).json({message:"Ride already has driver"})
  }
  ride.driverId  =driver._id
  ride.status="accepted"
  await ride.save()
  driver.isAvailable=false
  await driver.save()

  const updateRide =await RideModel.findById(ride._id)
  .populate("passangerId","name email")
  .populate("driverId","name email")
  res.status(200).json(updateRide)

  res.status(200).json(ride)
}catch(error){

}
}

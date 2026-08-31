import mongoose from "mongoose";
const driverSchema =new mongoose.Schema({
  userId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
    unique:true,
  },
  carInfo:{
    type:String,
    trim:true,
    default:"",
  },
  licensenumber:{
    type:Number,
    trim:true,
    default:""
  },
  isAvailable:{
    type:Boolean,
    default:true
  }
},{timestamps:true})
const DriverModel=mongoose.model("driver",driverSchema)
export default DriverModel

import mongoose from "mongoose";
const rideSchema =new mongoose.Schema({
  passengerId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  driverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    default:null
  },
  pickupLocation:{
    type:String,
    required:true,
    trim:true
  },
  dropofflocation:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["requested", "accepted","started","completed","cancelled"],
    default:"requested"
  },
  fare:{
    type:Number,
    default:null
  },
  startedAt:{
    type:Date,
    default:null
  },
  completedAt:{
    type:Date,
    default:null
  },
  name:{
    type:String,
    required:true,
    trim:true
  },
  Phone:{
    type:String,
    required:true,
  }
},{timestamps:true})

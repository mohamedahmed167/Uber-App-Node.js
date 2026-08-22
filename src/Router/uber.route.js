const express =require("express");
const UserModel = require("../models/User.model");
const { Register } = require("../Controllers/uber.controller");
const router=express.Router()
router.post("/register",Register)
module.exports=router

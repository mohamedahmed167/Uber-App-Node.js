require("dotenv").config()
const express =require("express")
const app=express()
const mongoose =require("mongoose")
const router = require("./Router/uber.route")
const PORT =process.env.PORT
// middleware

app.use(express.json())
app.use("/api/uber",router)
mongoose.connect(process.env.Monog_URI).then(()=>{
  console.log("MonogDB is connected")
}).catch((error)=>{
  console.log(error)
})

app.get("/",(req,res)=>{
  res.send("hello hashish")
})
app.listen(PORT,()=>{
  console.log(`the server is Running and my PORT is ${PORT}`)
})

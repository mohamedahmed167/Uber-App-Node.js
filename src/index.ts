import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./Router/uber.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use("/api/uber", router);

mongoose
  .connect(process.env.Monog_URI as string)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error: Error) => {
    console.log(error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("hello hashish");
});

app.listen(PORT, () => {
  console.log(`The server is Running and my PORT is ${PORT}`);
});

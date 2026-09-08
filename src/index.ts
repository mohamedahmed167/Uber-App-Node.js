import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import uberRouter from "./Router/uber.route";
import rideRouter  from "./Router/ride.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/uber", uberRouter);
app.use("/api/rides", rideRouter);
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

const server = app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
  console.log("Server address:", server.address());
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});

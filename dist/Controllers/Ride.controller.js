"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canceledRide = exports.completedRide = exports.startRide = exports.acceptRide = exports.getRideById = exports.getRide = exports.newRide = exports.RideVaildation = void 0;
const Ride_model_1 = __importDefault(require("../models/Ride.model"));
const Driver_model_1 = __importDefault(require("../models/Driver.model"));
const express_validator_1 = require("express-validator");
exports.RideVaildation = [
    (0, express_validator_1.body)("pickupLocation").trim().notEmpty().withMessage("pickupLocation is required"),
    (0, express_validator_1.body)("dropoffLocation").trim().notEmpty().withMessage("dropoffLocation is required"),
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("phone").trim().notEmpty().withMessage("phone is required")
];
const newRide = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { pickupLocation, dropoffLocation, name, phone } = req.body;
        if (!pickupLocation ||
            typeof pickupLocation != "string" ||
            !dropoffLocation ||
            typeof dropoffLocation != "string") {
            return res.status(400).json({
                message: "pickup and dropoff are required and must be string",
            });
        }
        const ride = new Ride_model_1.default({
            name: name.trim().toLowerCase(),
            phone: phone.trim(),
            passengerId: req.userId,
            pickupLocation: pickupLocation.trim(),
            dropoffLocation: dropoffLocation.trim(),
            status: "requested",
        });
        await ride.save();
        res.status(201).json(ride);
    }
    catch (error) {
        console.log("error in create Ride", error);
        res.status(500).json({
            message: "error creating ride",
            error: error instanceof Error ? error.message : "Unkown Error",
        });
    }
};
exports.newRide = newRide;
const getRide = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const rides = await Ride_model_1.default.find({
            $or: [{ passengerId: req.userId }, { driverId: req.userId }],
        })
            .sort({ createdAt: -1 })
            .populate("passengerId", "name email")
            .populate("driverId", "name email");
        res.status(201).json({
            success: true,
            message: "successfully to get all Rides",
            data: rides,
        });
    }
    catch (error) {
        console.log("there is error in get Ride", error);
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : "Unkown" });
    }
};
exports.getRide = getRide;
const getRideById = async (req, res) => {
    try {
        const id = req.params.id;
        const ride = await Ride_model_1.default.findById(id)
            .populate("passengerId", " name email")
            .populate("driverId", " name email");
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }
        const isPassenger = ride.passengerId?._id?.toString() === req.userId;
        const isDriver = ride.driverId?._id.toString() === req.userId;
        if (!isPassenger && !isDriver) {
            return res
                .status(403)
                .json({ message: "you are not authorizaed to view this ride" });
        }
        res
            .status(200)
            .json({ success: true, message: "successfully get ride", data: ride });
    }
    catch (error) {
        console.log("there is error in get ride by id", error);
        res
            .status(500)
            .json({ error: error instanceof Error ? error.message : "Unkown" });
    }
};
exports.getRideById = getRideById;
const acceptRide = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const driver = await Driver_model_1.default.findOne({ userId: req.userId });
        console.log("USER ID:", req.userId);
        console.log("DRIVER:", driver);
        console.log("IS AVAILABLE:", driver?.isAvailable);
        if (!driver) {
            return res.status(403).json({ message: "only driver can accept rides" });
        }
        if (!driver.isAvailable) {
            return res
                .status(400)
                .json({ message: "you are currently not available to accept rides" });
        }
        const ride = await Ride_model_1.default.findById(id);
        console.log("RIDE", ride);
        if (!ride) {
            return res.status(400).json({ message: "Ride is not found" });
        }
        if (ride.status != "requested") {
            return res
                .status(400)
                .json({ message: "Ride is not available for acceptance" });
        }
        if (ride.driverId) {
            return res.status(400).json({ message: "Ride already has driver" });
        }
        ride.driverId = driver.userId;
        console.log("RIDE TWO :", ride);
        ride.status = "accepted";
        await ride.save();
        driver.isAvailable = false;
        await driver.save();
        const updateRide = await Ride_model_1.default.findById(ride._id)
            .populate("passengerId", "name email")
            .populate("driverId", "name email");
        console.log("WITHOUT POPULATE:", updateRide);
        res.status(200).json(updateRide);
    }
    catch (error) { }
};
exports.acceptRide = acceptRide;
const startRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride_model_1.default.findById(id);
        if (!ride)
            return res.status(404).json({ message: "Ride not found" });
        if (ride.driverId?.toString() !== req.userId?.toString()) {
            return res.status(403).json({ message: "you are not authorized to start this ride" });
        }
        if (ride.status !== "accepted")
            return res.status(400).json({ message: "can't starte Ride" });
        ride.status = "started";
        ride.startedAt = new Date();
        await ride.save();
        const updatedRide = await Ride_model_1.default.findById(ride._id).populate("passengerId", "name email").populate("driverId", "name email");
        res
            .status(200)
            .json({
            sucess: "successfully",
            message: "the ride is started successfully",
            updatedRide,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json("error in started ride");
    }
};
exports.startRide = startRide;
const completedRide = async (req, res) => {
    try {
        console.log("BODY =>", req.body);
        console.log("FARE =>", req.body?.fare);
        const { id } = req.params;
        const Ride = await Ride_model_1.default.findById(id);
        if (!Ride)
            return res.status(404).json({ message: "Ride not found" });
        if (Ride.driverId?.toString() !== req.userId?.toString()) {
            return res.status(403).json({ message: "you are not authorized to complete this ride" });
        }
        if (Ride.status !== "started") {
            return res.status(400).json({ message: "can't completed this Ride" });
        }
        const fare = req.body?.fare != null ? Number(req.body.fare) : null;
        Ride.status = "completed";
        Ride.completedAt = new Date();
        if (fare != null && !isNaN(fare) && fare >= 0) {
            Ride.fare = fare;
        }
        await Ride.save();
        const driver = await Driver_model_1.default.findOne({ userId: req.userId });
        if (driver) {
            driver.isAvailable = true;
            await driver.save();
        }
        const updatedRide = await Ride_model_1.default.findById(Ride._id).populate("passengerId", "name email").populate("driverId", "name email");
        res.status(200).json({ sucess: "successfully", message: "the Ride is completed successfully", updatedRide });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error completing ride",
        });
    }
};
exports.completedRide = completedRide;
const canceledRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride_model_1.default.findById(id);
        if (!ride) {
            return res.status(404).json({
                message: "Ride not found",
            });
        }
        console.log("current status:", ride.status);
        const isPassenger = ride.passengerId?.toString() === req.userId?.toString();
        const isDriver = ride.driverId?.toString() === req.userId?.toString();
        if (!isPassenger && !isDriver) {
            return res.status(403).json({
                message: "You are not authorized to cancel this ride",
            });
        }
        if (ride.status === "started" ||
            ride.status === "completed" ||
            ride.status === "cancelled") {
            return res.status(400).json({
                message: "Can't cancel this ride",
            });
        }
        ride.status = "cancelled";
        await ride.save();
        if (ride.driverId) {
            const driver = await Driver_model_1.default.findOne({
                userId: ride.driverId,
            });
            if (driver) {
                driver.isAvailable = true;
                await driver.save();
            }
        }
        const updatedRide = await Ride_model_1.default.findById(ride._id)
            .populate("passengerId", "name email")
            .populate("driverId", "name email");
        return res.status(200).json({
            success: true,
            message: "The ride was cancelled successfully",
            updatedRide,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in cancel ride",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.canceledRide = canceledRide;
//# sourceMappingURL=Ride.controller.js.map
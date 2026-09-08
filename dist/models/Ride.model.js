"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rideSchema = new mongoose_1.default.Schema({
    passengerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    driverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    pickupLocation: {
        type: String,
        required: true,
        trim: true
    },
    dropoffLocation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["requested", "accepted", "started", "completed", "cancelled"],
        default: "requested"
    },
    fare: {
        type: Number,
        default: null
    },
    startedAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    }
}, { timestamps: true });
const RideModel = mongoose_1.default.model("Ride", rideSchema);
exports.default = RideModel;
//# sourceMappingURL=Ride.model.js.map
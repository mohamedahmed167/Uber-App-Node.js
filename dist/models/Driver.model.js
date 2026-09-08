"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const driverSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    carInfo: {
        type: String,
        trim: true,
        default: "",
    },
    licensenumber: {
        type: Number,
        trim: true,
        default: ""
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const DriverModel = mongoose_1.default.model("driver", driverSchema);
exports.default = DriverModel;
//# sourceMappingURL=Driver.model.js.map
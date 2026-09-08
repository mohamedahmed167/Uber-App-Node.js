"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "driver"], default: "user" },
    passwordResetOTP: String,
    passwordResetOTPExpires: Number,
    passwordResetOTPIsVaild: Boolean,
}, { timestamps: true });
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=User.model.js.map
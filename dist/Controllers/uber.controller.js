"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.Login = exports.Register = exports.registerVaildation = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Driver_model_1 = __importDefault(require("../models/Driver.model"));
const express_validator_1 = require("express-validator");
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.registerVaildation = [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("vaild email is required "),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("password should be at least 6 characters long"),
];
const Register = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, role } = req.body;
        if (!name || typeof name != "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "name is required and should be non-empty string",
            });
        }
        if (!email || typeof email != "string" || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "is required and should be non-empty string",
            });
        }
        if (!password || typeof password != "string" || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password is required and should be at least 6 characters long ",
            });
        }
        const existEmail = await User_model_1.default.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                success: false,
                message: "there email is already exist",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_model_1.default.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role: role === "driver" ? "driver" : "user",
        });
        await user.save();
        if (user.role == "driver") {
            const driver = new Driver_model_1.default({
                userId: user._id,
            });
            await driver.save();
        }
        const userResponse = user.toObject();
        delete userResponse.password;
        return res.status(200).json({
            message: `vaild Register welcome to uber app`,
            user: userResponse,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "there is problem in Register" });
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "invaild email or password" });
        }
        const user = await User_model_1.default.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res
                .status(404)
                .json({ message: "please enter email or password" });
        }
        const IsVaild = await bcrypt_1.default.compare(password, user.password);
        if (!IsVaild) {
            return res.status(400).json({ message: "password is not matched" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            success: true,
            message: `User Logged in successfully`,
            user: userResponse,
            token,
        });
    }
    catch (error) {
        console.log("there is error in login", error);
        res
            .status(400)
            .json({ message: "there is error in login please check it" });
    }
};
exports.Login = Login;
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || typeof email !== "string") {
            return res.status(404).json({ message: "vaild email is required" });
        }
        const user = await User_model_1.default.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(400).json("user not found");
        }
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const HashedOTP = crypto_1.default.createHash("sha256").update(OTP).digest("hex");
        user.passwordResetOTP = HashedOTP;
        user.passwordResetOTPExpires = Date.now() + 10 * 60 * 1000;
        user.passwordResetOTPIsVaild = true;
        await user.save();
        const message = `hi ${user.name},we received a request to reset the password on your todo app \n ${OTP} enter this code to compelet the res thanks `;
        await (0, sendEmail_1.default)({
            email: user.email,
            subject: "RYVO Password Reset OTP ",
            message,
        });
        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully",
        });
    }
    catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            success: false,
            message: "Error while sending password reset OTP",
        });
    }
};
exports.forgetPassword = forgetPassword;
const resetPassword = async (req, res) => {
    try {
        const { email, OTP, newPassword } = req.body;
        if (!email || !OTP || !newPassword) {
            return res
                .status(400)
                .json({ message: "email ,OTP and password are required" });
        }
        const user = await User_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        const hashedOTP = crypto_1.default.createHash("sha256").update(OTP).digest("hex");
        if (user.passwordResetOTP != hashedOTP) {
            return res.status(400).json({ message: "invaild OTP" });
        }
        if (!user.passwordResetOTPExpires || user.passwordResetOTPExpires < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: " password reset successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error in reset password" });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=uber.controller.js.map
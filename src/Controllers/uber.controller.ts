import { Request, Response } from "express";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DriverModel from "../models/Driver.model";
import { body, validationResult } from "express-validator";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";
export const registerVaildation = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email").trim().isEmail().withMessage("vaild email is required "),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters long"),
];

export const Register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
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
        message:
          "password is required and should be at least 6 characters long ",
      });
    }
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "there email is already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: role === "driver" ? "driver" : "user",
    });
    await user.save();
    if (user.role == "driver") {
      const driver = new DriverModel({
        userId: user._id,
      });
      await driver.save();
    }

    const userResponse: any = user.toObject();
    delete userResponse.password;
    return res.status(200).json({
      message: `vaild Register welcome to uber app`,
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "there is problem in Register" });
  }
};
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "invaild email or password" });
    }
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ message: "please enter email or password" });
    }
    const IsVaild = await bcrypt.compare(password, user.password);
    if (!IsVaild) {
      return res.status(400).json({ message: "password is not matched" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" },
    );

    const userResponse = user.toObject() as {
      name: string;
      email: string;
      password?: string;
      role: string;
    };
    delete userResponse.password;
    res.status(200).json({
      success: true,
      message: `User Logged in successfully`,
      user: userResponse,
      token,
    });
  } catch (error) {
    console.log("there is error in login", error);
    res
      .status(400)
      .json({ message: "there is error in login please check it" });
  }
};
export const forgetPassword = async (req: Request, res: Response) => {
  try{
const { email } = req.body;
if (!email || typeof email !== "string") {
  return res.status(404).json({ message: "vaild email is required" });
}
const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
if (!user) {
  return res.status(400).json("user not found");
}
const OTP = Math.floor(100000 + Math.random() * 900000).toString();

const HashedOTP = crypto.createHash("sha256").update(OTP).digest("hex");
user.passwordResetOTP = HashedOTP;
user.passwordResetOTPExpires = Date.now() + 10 * 60 * 1000;
user.passwordResetOTPIsVaild = true;
await user.save();

const message = `hi ${user.name},we received a request to reset the password on your todo app \n ${OTP} enter this code to compelet the res thanks `;

await sendEmail({
  email: user.email,
  subject: "RYVO Password Reset OTP ",
  message,
});

return res.status(200).json({
  success: true,
  message: "Password reset OTP sent successfully",
});
  }catch(error){
 console.error("Forgot password error:", error);

 return res.status(500).json({
   success: false,
   message: "Error while sending password reset OTP",
 });
  }
};

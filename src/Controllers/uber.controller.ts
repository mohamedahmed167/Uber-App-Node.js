import { Request, Response } from "express";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";
export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if(!name || typeof name != "string" || !name.trim()){
      return res.status(400).json({ success:false ,message:'name is required and should be non-empty string'})
    }
    if(!email || typeof email != "string" || !email.trim()){
      return res.status(400).json({success :false  , message:"is required and should be non-empty string"})
    }

    if(!password || typeof password !="string" || password.length <6){
      return res.status(400).json({success :false ,message:"password is required and should be at least 6 characters long "})
    }
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        success:false ,
        message: "there email is already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: role === "driver" ? "driver" : "user",
    });
    await user.save();
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
    const user = await UserModel.findOne({ email:email.trim().toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ message: "please enter email or password" });
    }
    const IsVaild = await bcrypt.compare(password, user.password);
    if (!IsVaild) {
      return res.status(400).json({ message: "password is not matched" });
    }

    const userResponse =user.toObject() as{
      name:string,
      email:string,
      password?:string,
      role:string
    };
    delete userResponse.password;
     res.status(200).json({ success: true, message: `User Logged in successfully`,user:userResponse });
  } catch (error) {
    console.log("there is error in login", error);
    res
      .status(400)
      .json({ message: "there is error in login please check it" });
  }
};

import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

// types

 export interface AuthRequest extends Request {
  userId?: string;
}

interface MYJwtPayload {
  userId: string;
  email: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authorization.split(" ")[1];
    if(!token){
      return res.status(401).json({
        sucess:false,
        message:"forbiedden"})
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as MYJwtPayload;

    req.userId = decoded.userId;


    next();
  } catch (error) {
    console.log("here is error in authorization");

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

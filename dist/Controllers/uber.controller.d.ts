import { Request, Response } from "express";
export declare const registerVaildation: import("express-validator").ValidationChain[];
export declare const Register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const Login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const forgetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=uber.controller.d.ts.map
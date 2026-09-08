"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                sucess: false,
                message: "forbiedden"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log("here is error in authorization");
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (option) => {
    try {
        console.log("HOST_EMAIL =", process.env.HOST_EMAIL);
        console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
        console.log("EMAIL =", process.env.SMTP_USER);
        const transport = nodemailer_1.default.createTransport({
            host: process.env.HOST_EMAIL,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transport.verify();
        await transport.sendMail({
            from: `"RYVO APP" <${process.env.SMTP_USER}>`,
            to: option.email,
            subject: option.subject,
            text: option.message,
        });
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("SMTP ERROR:", error);
        throw error;
    }
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map
import express, { Response } from "express";

import {
  forgetPassword,
  Login,
  Register,
  registerVaildation,
  resetPassword,
} from "../Controllers/uber.controller";

import { auth, AuthRequest } from "../Middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and user management
 */

/**
 * @swagger
 * /api/uber/register:
 *   post:
 *     summary: Register a new user and new driver
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mohamed Ahmed
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mohamed@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 */

router.post("/register", registerVaildation, Register);

/**
 * @swagger
 * /api/uber/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mohamed@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Login error
 *       401:
 *         description: Invalid email or password
 */

router.post("/login", Login);

/**
 * @swagger
 * /api/uber/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 68c123456789abcdef123456
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/me", auth, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    userId: req.userId,
  });
});

/**
 * @swagger
 * /api/uber/forgetPassword:
 *   post:
 *     summary: Send password reset OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mohamed@example.com
 *     responses:
 *       200:
 *         description: Password reset OTP sent successfully
 *       400:
 *         description: Invalid email
 *       404:
 *         description: User not found
 *       500:
 *         description: Error while sending password reset OTP
 */

router.post("/forgetPassword", forgetPassword);

/**
 * @swagger
 * /api/uber/resetPassword:
 *   patch:
 *     summary: Reset user password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - OTP
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mohamed@example.com
 *               OTP:
 *                 type: string
 *                 example: "123456"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: User not found
 *       500:
 *         description: Error while resetting password
 */

router.patch("/resetPassword", resetPassword);

export default router;

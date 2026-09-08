import express from "express";

import { auth } from "../Middlewares/auth.middleware";

import {
  acceptRide,
  canceledRide,
  completedRide,
  getRide,
  getRideById,
  newRide,
  RideVaildation,
  startRide,
} from "../Controllers/Ride.controller";

const router = express.Router();

// Authentication middleware
router.use(auth);

/**
 * @swagger
 * tags:
 *   - name: Rides
 *     description: Ride management
 */

/**
 * @swagger
 * /api/rides:
 *   post:
 *     summary: Create a new ride
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickupLocation
 *               - destination
 *             properties:
 *               pickupLocation:
 *                 type: string
 *                 example: Tanta
 *               destination:
 *                 type: string
 *                 example: Cairo
 *     responses:
 *       201:
 *         description: Ride created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", RideVaildation, newRide);

/**
 * @swagger
 * /api/rides:
 *   get:
 *     summary: Get all rides
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rides retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", getRide);

/**
 * @swagger
 * /api/rides/{id}:
 *   get:
 *     summary: Get ride by ID
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Ride retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 */
router.get("/:id", getRideById);

/**
 * @swagger
 * /api/rides/{id}/accept:
 *   put:
 *     summary: Accept a ride
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Ride accepted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 */
router.put("/:id/accept", acceptRide);

/**
 * @swagger
 * /api/rides/{id}/start:
 *   put:
 *     summary: Start a ride
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Ride started successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 */
router.put("/:id/start", startRide);

/**
 * @swagger
 * /api/rides/{id}/compelet:
 *   put:
 *     summary: Complete a ride
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Ride completed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 */
router.put("/:id/compelet", completedRide);

/**
 * @swagger
 * /api/rides/{id}/cancel:
 *   put:
 *     summary: Cancel a ride
 *     tags:
 *       - Rides
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *         example: 68c123456789abcdef123456
 *     responses:
 *       200:
 *         description: Ride canceled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 */
router.put("/:id/cancel", canceledRide);

export default router;

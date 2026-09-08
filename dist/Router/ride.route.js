"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const Ride_controller_1 = require("../Controllers/Ride.controller");
const router = express_1.default.Router();
// Authentication middleware
router.use(auth_middleware_1.auth);
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
router.post("/", Ride_controller_1.RideVaildation, Ride_controller_1.newRide);
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
router.get("/", Ride_controller_1.getRide);
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
router.get("/:id", Ride_controller_1.getRideById);
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
router.put("/:id/accept", Ride_controller_1.acceptRide);
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
router.put("/:id/start", Ride_controller_1.startRide);
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
router.put("/:id/compelet", Ride_controller_1.completedRide);
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
router.put("/:id/cancel", Ride_controller_1.canceledRide);
exports.default = router;
//# sourceMappingURL=ride.route.js.map
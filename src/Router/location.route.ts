import express from "express";
import { searchLocation } from "../Controllers/location.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Locations
 *     description: Search locations using OpenStreetMap
 */

/**
 * @swagger
 * /api/locations/search:
 *   get:
 *     summary: Search for locations in Egypt
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Maadi
 *     responses:
 *       200:
 *         description: Locations retrieved successfully
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Error while searching locations
 */

router.get("/search", searchLocation);

export default router;

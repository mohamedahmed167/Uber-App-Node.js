"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../Controllers/location.controller");
const router = express_1.default.Router();
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
router.get("/search", location_controller_1.searchLocation);
exports.default = router;
//# sourceMappingURL=location.route.js.map
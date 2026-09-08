"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const currency_controller_1 = require("../Controllers/currency.controller");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Currency
 *     description: Currency conversion APIs
 */
/**
 * @swagger
 * /api/currency/convert:
 *   get:
 *     summary: Convert an amount from one currency to another
 *     description: Get the current exchange rate and convert the requested amount.
 *     tags:
 *       - Currency
 *
 *     parameters:
 *       - in: query
 *         name: amount
 *         required: true
 *         description: The amount to convert
 *         schema:
 *           type: number
 *           example: 100
 *
 *       - in: query
 *         name: from
 *         required: true
 *         description: The currency you want to convert from
 *         schema:
 *           type: string
 *           example: SAR
 *
 *       - in: query
 *         name: to
 *         required: true
 *         description: The currency you want to convert to
 *         schema:
 *           type: string
 *           example: EGP
 *
 *     responses:
 *       200:
 *         description: Currency converted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 100
 *                     from:
 *                       type: string
 *                       example: SAR
 *                     to:
 *                       type: string
 *                       example: EGP
 *                     rate:
 *                       type: number
 *                       example: 13.66
 *                     convertedAmount:
 *                       type: number
 *                       example: 1366
 *
 *       400:
 *         description: Missing or invalid query parameters
 *
 *       500:
 *         description: Currency conversion failed
 */
router.get("/convert", currency_controller_1.convertCurrencyController);
exports.default = router;
//# sourceMappingURL=currency.route.js.map
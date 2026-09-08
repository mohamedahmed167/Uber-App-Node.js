"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrencyController = void 0;
const currency_service_1 = require("../services/currency.service");
const convertCurrencyController = async (req, res) => {
    try {
        const { amount, from, to } = req.query;
        if (!amount || !from || !to) {
            return res.status(400).json({
                success: false,
                message: "amount ,from and to are required"
            });
        }
        const result = await (0, currency_service_1.convertCurrency)(Number(amount), String(from).toUpperCase(), String(to).toUpperCase());
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error.response?.data || error.message);
    }
    return res.status(500).json({
        success: false,
        message: "Currency conversion failed",
    });
};
exports.convertCurrencyController = convertCurrencyController;
//# sourceMappingURL=currency.controller.js.map
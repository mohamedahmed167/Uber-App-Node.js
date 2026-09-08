"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrency = void 0;
const axios_1 = __importDefault(require("axios"));
const convertCurrency = async (amount, from, to) => {
    const response = await axios_1.default.get(`https://api.frankfurter.dev/v2/rate/${from}/${to}`);
    const rate = response.data.rate;
    const convertAmount = amount * rate;
    return {
        amount,
        from,
        to,
        rate,
        convertAmount
    };
};
exports.convertCurrency = convertCurrency;
//# sourceMappingURL=currency.service.js.map
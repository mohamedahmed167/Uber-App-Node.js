"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLocation = void 0;
const axios_1 = __importDefault(require("axios"));
const searchLocation = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== "string") {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }
        const response = await axios_1.default.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: query,
                format: "json",
                addressdetails: 1,
                limit: 5,
                countrycodes: "eg",
            },
            headers: {
                "User-Agent": "RYVO-RideHailing-App",
            },
        });
        const locations = response.data.map((place) => ({
            name: place.display_name,
            latitude: Number(place.lat),
            longitude: Number(place.lon),
            type: place.type,
        }));
        return res.status(200).json({
            success: true,
            count: locations.length,
            data: locations,
        });
    }
    catch (error) {
        console.log("Search location error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Error while searching locations",
        });
    }
};
exports.searchLocation = searchLocation;
//# sourceMappingURL=location.controller.js.map
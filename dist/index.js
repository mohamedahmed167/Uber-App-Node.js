"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const uber_route_1 = __importDefault(require("./Router/uber.route"));
const ride_route_1 = __importDefault(require("./Router/ride.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const currency_route_1 = __importDefault(require("./Router/currency.route"));
const location_route_1 = __importDefault(require("./Router/location.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api/uber", uber_route_1.default);
app.use("/api/rides", ride_route_1.default);
app.use("/api/locations", location_route_1.default);
app.use("/api/currency", currency_route_1.default);
mongoose_1.default
    .connect(process.env.Monog_URI)
    .then(() => {
    console.log("MongoDB is connected");
})
    .catch((error) => {
    console.log(error);
});
app.get("/", (req, res) => {
    res.send("hello hashish");
});
const server = app.listen(PORT, () => {
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
    console.log("Server address:", server.address());
});
server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});
//# sourceMappingURL=index.js.map
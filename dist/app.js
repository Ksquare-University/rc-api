"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_routes_1 = __importDefault(require("./routes/city.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/city', city_routes_1.default);
app.get('/', (req, res) => {
    res.send('This App is alive :D');
});
exports.default = app;

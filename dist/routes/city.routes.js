"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../controllers/index"));
const cityRoutes = (0, express_1.Router)();
const { CityController } = index_1.default;
cityRoutes.get('/', CityController.getCity);
cityRoutes.get('/:id', CityController.getCityById);
cityRoutes.post('/', CityController.createCity);
cityRoutes.delete('/:id', CityController.deleteCourse);
exports.default = cityRoutes;

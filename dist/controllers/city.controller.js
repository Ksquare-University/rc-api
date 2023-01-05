"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const city_model_1 = require("../models/city.model");
const CityController = {
    getCity: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cities = yield city_model_1.City.findAll({
                attributes: ['id', 'name'],
                where: {
                    is_active: true
                }
            });
            if (!cities) {
                return res.status(404).json({
                    message: 'City not found',
                });
            }
            if (cities.length === 0) {
                return res.status(404).json({
                    message: 'The cities list is empty',
                });
            }
            console.log();
            res.status(200).send(cities);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    }),
    getCityById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const course = yield city_model_1.City.findByPk(Number(id));
            if (!course)
                return res.status(404).json({
                    message: "City does not exists",
                });
            res.status(200).json(course);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    }),
    createCity: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const newCity = yield city_model_1.City.create({ name });
            res.status(200).json(newCity);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    }),
    deleteCourse: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const courseDeleted = yield city_model_1.City.update({
                is_active: false
            }, {
                where: {
                    id: id,
                }
            });
            if (!courseDeleted)
                return res.status(404).json({
                    message: 'City does not exists'
                });
            res.status(200).json(courseDeleted);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Server error'
            });
        }
    }),
};
exports.default = CityController;

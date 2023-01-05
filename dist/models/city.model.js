"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCity = exports.City = void 0;
const sequelize_1 = require("sequelize");
class City extends sequelize_1.Model {
}
exports.City = City;
const initCity = (sequelize) => {
    City.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: sequelize_1.DataTypes.STRING,
        is_active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize
    });
};
exports.initCity = initCity;

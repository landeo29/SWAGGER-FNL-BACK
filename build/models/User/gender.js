"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Gender extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            gender: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            }
        }, // attributes
        {
            sequelize,
            timestamps: false,
            tableName: 'gender'
        });
        return this;
    }
}
exports.default = Gender;

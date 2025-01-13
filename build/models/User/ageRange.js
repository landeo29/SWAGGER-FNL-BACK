"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class AgeRange extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            age_range: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, // attributes
        {
            sequelize,
            timestamps: false,
            tableName: "age_range",
        });
        return this;
    }
}
exports.default = AgeRange;

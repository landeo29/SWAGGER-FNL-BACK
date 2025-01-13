"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Hierarchical_level extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            level: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, // attributes
        {
            sequelize,
            timestamps: false,
            tableName: "hierarchical_level",
        });
        return this;
    }
}
exports.default = Hierarchical_level;

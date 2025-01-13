"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Empresas extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            nombre: {
                type: sequelize_1.DataTypes.STRING
            },
            ruc: {
                type: sequelize_1.DataTypes.STRING
            },
        }, {
            sequelize,
            timestamps: true,
            tableName: "empresas"
        });
        return this;
    }
}
exports.default = Empresas;

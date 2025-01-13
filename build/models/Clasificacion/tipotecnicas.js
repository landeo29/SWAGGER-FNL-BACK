"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TipoTecnicas extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true, // Clave primaria autoincremental
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false, // El nombre no puede ser nulo
            },
        }, {
            sequelize,
            timestamps: false,
            tableName: "tipotecnicas",
        });
        return this;
    }
}
exports.default = TipoTecnicas;

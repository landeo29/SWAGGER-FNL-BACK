"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EstresNiveles extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true, // Clave primaria autoincremental
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false, // El nombre es obligatorio
            },
            descripcion: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true, // Puede ser nulo si no hay descripción
            },
        }, {
            sequelize,
            timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
            tableName: "estres_niveles", // Nombre de la tabla en la base de datos
        });
        return this;
    }
}
exports.default = EstresNiveles;

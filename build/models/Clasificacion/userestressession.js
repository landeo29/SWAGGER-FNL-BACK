"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserEstresSession extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true, // Clave primaria autoincremental
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false, // Campo obligatorio
                references: {
                    model: "users", // Referencia a la tabla de usuarios
                    key: "id",
                },
                onUpdate: "CASCADE", // Actualización en cascada
                onDelete: "CASCADE", // Eliminación en cascada
            },
            estres_nivel_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false, // Campo obligatorio
                references: {
                    model: "estres_niveles", // Referencia a la tabla de niveles de estrés
                    key: "id",
                },
                onUpdate: "CASCADE", // Actualización en cascada
                onDelete: "CASCADE", // Eliminación en cascada
            },
        }, {
            sequelize,
            timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
            tableName: "user_estres_sessions", // Nombre de la tabla en la base de datos
        });
        return this;
    }
}
exports.default = UserEstresSession;

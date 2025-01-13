"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EstresTecnicas extends sequelize_1.Model {
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
            mensaje: {
                type: sequelize_1.DataTypes.TEXT, // Campo de texto para el mensaje
                allowNull: true, // Puede ser nulo si no hay mensaje
            },
            steps: {
                type: sequelize_1.DataTypes.TEXT, // Campo de texto para almacenar los pasos
                allowNull: true, // Los pasos pueden ser nulos
            },
            tipo: {
                type: sequelize_1.DataTypes.STRING(45), // Máximo 45 caracteres para el campo "tipo"
                allowNull: true, // Puede ser nulo si no hay tipo definido
            },
            icon: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true, // El nombre no puede ser nulo
            },
            tipotecnicas_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "tipotecnicas", // Nombre de la tabla referenciada
                    key: "id", // Clave primaria de la tabla tipotecnicas
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE", // Borra la técnica si se elimina el tipo de técnica
            },
            user_id: {
                // Nuevo campo para el usuario
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        }, {
            sequelize,
            timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
            tableName: 'estrestecnicas', // Nombre de la tabla en la base de datos
        });
        return this;
    }
}
exports.default = EstresTecnicas;

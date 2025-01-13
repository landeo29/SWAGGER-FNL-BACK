"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserPrograma extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Relacionado con la tabla 'users'
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            dia: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            nombre_tecnica: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            tipo_tecnica: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            descripcion: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            guia: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            comentario: {
                type: sequelize_1.DataTypes.TEXT, // Comentarios del usuario sobre la técnica
                allowNull: true,
            },
            estrellas: {
                type: sequelize_1.DataTypes.INTEGER, // Calificación con estrellas
                allowNull: true, // Puedes ajustarlo si prefieres que sea obligatorio
                validate: {
                    min: 1, // Validación para asegurarse de que la calificación sea al menos 1
                    max: 5, // Validación para asegurarse de que la calificación no supere 5
                },
            },
            start_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: null, // Valor por defecto de la fecha de inicio es el momento actual
            },
            completed_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: null, // Valor por defecto de la fecha de inicio es el momento actual
            },
        }, {
            sequelize,
            timestamps: false,
            tableName: 'userprograma',
        });
        return this;
    }
}
exports.default = UserPrograma;

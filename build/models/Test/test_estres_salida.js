"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Test_estres_salida extends sequelize_1.Model {
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
                    model: "users",
                    key: "id",
                },
            },
            pregunta_1: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_2: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_3: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_4: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_5: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_6: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_7: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_8: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_9: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_10: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_11: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_12: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_13: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_14: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_15: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_16: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_17: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_18: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_19: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_20: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_21: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_22: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            pregunta_23: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            estado: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
        }, // attributes
        {
            sequelize,
            timestamps: false,
            tableName: 'test_estres_salida',
        });
        return this;
    }
}
exports.default = Test_estres_salida;

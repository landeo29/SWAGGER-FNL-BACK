"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            permisopoliticas: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            funcyinteract: {
                type: sequelize_1.DataTypes.INTEGER, // Si es un entero, usa valores numéricos como 0 (false) o 1 (true)
                allowNull: true,
                defaultValue: 0, // Usar un valor numérico en lugar de false
            },
            profileImage: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            userresponsebool: {
                type: sequelize_1.DataTypes.BOOLEAN, // Sequelize lo mapea a TINYINT(1) en MySQL
                allowNull: false,
                defaultValue: false,
            },
            testestresbool: {
                type: sequelize_1.DataTypes.BOOLEAN, // Sequelize lo mapea a TINYINT(1) en MySQL
                allowNull: false,
                defaultValue: false,
            },
        }, // attributes
        {
            sequelize,
            timestamps: false,
            tableName: 'users'
        });
        return this;
    }
}
exports.default = User;

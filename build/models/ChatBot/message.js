"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../User/user"));
class Message extends sequelize_1.Model {
    static initModel(sequelize) {
        super.init({
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: user_1.default,
                    key: "id",
                },
            },
            user_id_receptor: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: user_1.default,
                    key: "id",
                },
            },
            sentimientos: {
                type: sequelize_1.DataTypes.STRING,
            },
            factor_psicosocial: {
                type: sequelize_1.DataTypes.STRING,
            },
            score: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            keyword_frequency: {
                type: sequelize_1.DataTypes.TEXT,
            },
            message_length: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, // attributes
        {
            sequelize,
            timestamps: false,
            tableName: "messages",
        });
        return this;
    }
}
exports.default = Message;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Sequelize } from "sequelize-typescript";
//import {  Sequelize } from "sequelize";
//import { UserEstresSession } from "../../models/Clasificacion/userestressession";
const user_1 = require("../../models/User/user");
const database_1 = __importDefault(require("../../config/database"));
const message_1 = require("../../models/ChatBot/message");
const sequelize_1 = require("sequelize");
const date_fns_1 = require("date-fns");
//import moment from "moment";
class MetricasController {
    TotalEmpleados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { empresa_id } = req.body;
                const cant = yield user_1.User.count({
                    where: {
                        empresa_id,
                    },
                });
                if (!cant)
                    return res.status(404).json({ message: "no se encontraron usuarios" });
                return res.status(200).json({ cant });
            }
            catch (error) {
                console.log("Error: ", error.message);
            }
        });
    }
    EmpleadosEstressPorcentaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { empresa_id } = req.body;
                const connection = database_1.default.getConnection();
                if (!connection) {
                    return res
                        .status(500)
                        .json({ message: "Error de conexión a la base de datos" });
                }
                const usuariosPorEstres = yield connection.query("CALL ObtenerUsuariosPorEstres(:empresaId)", {
                    replacements: { empresaId: empresa_id },
                });
                if (!usuariosPorEstres)
                    return res.status(404).json({ message: "no se encontraron datos" });
                return res.status(200).json({ usuariosPorEstres });
            }
            catch (error) {
                console.log("Error: ", error.message);
            }
        });
    }
    EmpleadosUsaronFuncy(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const hoy = new Date();
            const startOfDayLocal = (0, date_fns_1.startOfDay)(new Date());
            const endOfDayLocal = (0, date_fns_1.endOfDay)(new Date());
            console.log("hoy: ", startOfDayLocal, endOfDayLocal);
            const cantidadMensajes = yield message_1.Message.count({
                where: {
                    user_id: {
                        [sequelize_1.Op.ne]: 1,
                    },
                    created_at: {
                        [sequelize_1.Op.between]: [startOfDayLocal, endOfDayLocal], // Filtra los mensajes creados entre el inicio y el fin del día
                    },
                },
            });
            return res.status(200).json({ cant: cantidadMensajes });
        });
    }
}
exports.default = MetricasController;

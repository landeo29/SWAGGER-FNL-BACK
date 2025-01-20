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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const message_1 = require("../../models/ChatBot/message");
const sequelize_1 = require("sequelize");
class MessageController {
    saveMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, userId } = req.body;
            const localDate = moment_timezone_1.default.tz(new Date(), "America/Lima"); // Obtener la hora actual en la zona horaria local
            try {
                const message = yield message_1.Message.create({
                    content,
                    user_id: userId,
                    user_id_receptor: 1, // O el valor adecuado según tu lógica
                    created_at: localDate.toDate(), // Convertir el objeto moment a una fecha JavaScript
                });
                res
                    .status(201)
                    .json({ message: "Mensaje guardado correctamente.", data: message });
            }
            catch (error) {
                console.error("Error al guardar el mensaje:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
    }
    saveMessageFromBot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, userId } = req.body;
            const localDate = moment_timezone_1.default.tz(new Date(), "America/Lima"); // Obtener la hora actual en la zona horaria local
            try {
                const message = yield message_1.Message.create({
                    content,
                    user_id: 1, // El bot
                    user_id_receptor: userId,
                    created_at: localDate.toDate(), // Convertir el objeto moment a una fecha JavaScript
                });
                res
                    .status(201)
                    .json({ message: "Mensaje guardado correctamente.", data: message });
            }
            catch (error) {
                console.error("Error al guardar el mensaje del bot:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
    }
    getFilteredMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.query.userId);
            const limit = parseInt(req.query.limit) || 20; // Número de mensajes por lote
            const offset = parseInt(req.query.offset) || 0; // Desplazamiento inicial
            try {
                const messages = yield message_1.Message.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { user_id: userId },
                            { user_id_receptor: userId },
                        ],
                    },
                    order: [["id", "DESC"]],
                    limit,
                    offset,
                });
                const messagesWithLocalTime = messages.map((message) => {
                    const utcDate = moment_timezone_1.default.utc(message.created_at);
                    const zonedDate = utcDate.tz("America/Lima");
                    return Object.assign(Object.assign({}, message.toJSON()), { created_at: zonedDate.format("YYYY-MM-DD HH:mm:ss") });
                });
                res.status(200).json(messagesWithLocalTime);
            }
            catch (error) {
                console.error("Error fetching filtered messages:", error);
                res.status(500).json({ error: "Error fetching filtered messages" });
            }
        });
    }
    getAllMessages(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_1.Message.findAll();
                res.status(200).json(messages);
            }
            catch (error) {
                console.error("Error fetching messages:", error);
                res.status(500).json({ error: "Error fetching messages" });
            }
        });
    }
}
exports.default = new MessageController();

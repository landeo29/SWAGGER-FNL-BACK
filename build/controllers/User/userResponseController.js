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
Object.defineProperty(exports, "__esModule", { value: true });
const user_responses_1 = require("../../models/User/user_responses");
class UserResponseController {
    saveUserResponse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, age_range_id, hierarchical_level_id, responsability_level_id, gender_id, created_at, } = req.body;
            try {
                const userResponse = yield user_responses_1.UserResponses.create({
                    user_id,
                    age_range_id,
                    hierarchical_level_id,
                    responsability_level_id,
                    gender_id,
                    created_at,
                });
                res
                    .status(201)
                    .json({
                    message: "Respuesta guardada exitosamente.",
                    data: userResponse,
                });
            }
            catch (error) {
                console.error("Error al guardar la respuesta del usuario:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
    }
    getAllUserResponses(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responses = yield user_responses_1.UserResponses.findAll();
                res.status(200).json(responses);
            }
            catch (error) {
                console.error("Error al obtener las respuestas de usuarios:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
    }
    getUserResponsesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params; // O puedes usar req.query si viene desde la URL
            try {
                const responses = yield user_responses_1.UserResponses.findAll({
                    where: { user_id: user_id }, // Filtrar por user_id
                });
                if (responses.length === 0) {
                    return res
                        .status(404)
                        .json({ message: "No se encontraron respuestas para este usuario." });
                }
                res.status(200).json(responses);
            }
            catch (error) {
                console.error("Error al obtener las respuestas de usuario:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
    }
}
exports.default = new UserResponseController();

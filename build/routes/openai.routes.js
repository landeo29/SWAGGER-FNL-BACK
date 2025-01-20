"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OpenaiController_1 = __importDefault(require("../controllers/ChatBot/OpenaiController"));
const OpenaiRoutes = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /ask:
 *    post:
 *      tags:
 *        - OpenAi
 *      summary: "Generacion de mensajes"
 *      description: Este endpoint para el chatbot funcy
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  prompt:
 *                      type: string
 *                  userId:
 *                      type: integer
 *      responses:
 *        '200':
 *          description: Retorna el mensaje
 *        '422':
 *          description: Error de validacion.
 */
OpenaiRoutes.post("/ask", OpenaiController_1.default.chat);
//OpenaiRoutes.post("/ask", OpenaiController.getBotResponse);
exports.default = OpenaiRoutes;

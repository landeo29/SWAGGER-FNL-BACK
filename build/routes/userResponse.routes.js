"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userResponseController_1 = __importDefault(require("../controllers/User/userResponseController"));
const UserResponseRoutes = (0, express_1.Router)();
// Definir las rutas para user_responses
/**
 * Post track
 * @openapi
 * /guardarUserResponses:
 *    post:
 *      tags:
 *        - User Responses
 *      summary: "Registrar user responses"
 *      description: Este endpoint es para Registrar el usuario responses
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userResponse"
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y datos almacenados
 *        '422':
 *          description: Error de validacion.
 */
UserResponseRoutes.post('/guardarUserResponses', userResponseController_1.default.saveUserResponse); // Ruta para guardar respuestas de usuarios
/**
 * Post track
 * @openapi
 * /userResponses:
 *    get:
 *      tags:
 *        - User Responses
 *      summary: "Lista todos los user responses"
 *      description: Este endpoint es para listar todos los user responses
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y datos almacenados
 *        '422':
 *          description: Error de validacion.
 *        '500':
 *          description: Error interno del servidor
 */
UserResponseRoutes.get('/userResponses', userResponseController_1.default.getAllUserResponses); // Ruta para obtener todas las respuestas de usuarios
/**
 * Post track
 * @openapi
 * /userResponses/{userId}:
 *    get:
 *      tags:
 *        - User Responses
 *      summary: "Lista todos los user responses de un user"
 *      description: Este endpoint es para listar todos los user responses de un usuario segun ID
 *      parameters:
 *        - name: userId
 *          in: path
 *          description: ID del usuario necesario
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *        '200':
 *          description: Retorna todos los user responses de un usuario
 *        '422':
 *          description: Error de validacion.
 *        '500':
 *          description: Error interno del servidor
 */
UserResponseRoutes.get('/userResponses/:user_id', userResponseController_1.default.getUserResponsesByUserId);
exports.default = UserResponseRoutes;

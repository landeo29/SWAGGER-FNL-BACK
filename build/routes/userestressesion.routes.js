"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userEstresSessionController_1 = __importDefault(require("../controllers/User/userEstresSessionController"));
const UserEstresSesionRoutes = (0, express_1.Router)();
// Ruta para obtener el nivel de estrés de un usuario por su user_id
/**
 * Post track
 * @openapi
 * /userestresessions/{userId}/nivel:
 *    get:
 *      tags:
 *        - User Estres Sessions
 *      summary: "Nivel de estres del usuario"
 *      description: Este endpoint es para obtener el nivel de estres del usuario
 *      parameters:
 *        - name: userId
 *          in: path
 *          description: ID del usuario necesario
 *          required: true
 *      responses:
 *        '200':
 *          description: Retorna el estres_nivel_id
 *        '422':
 *          description: Error de validacion.
 */
UserEstresSesionRoutes.get('/userestresessions/:user_id/nivel', userEstresSessionController_1.default.getEstresNivelByUserId);
/**
 * Post track
 * @openapi
 * /userestresessions/assign:
 *    post:
 *      tags:
 *        - User Estres Sessions
 *      summary: "Nivel de estres del usuario"
 *      description: Este endpoint es para obtener el nivel de estres del usuario
 *      requestBody:
 *          description: Asignar un nivel de estress
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user_id:
 *                      type: integer
 *                  estres_nivel_id:
 *                      type: integer
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y la sesion de estress asignada
 *        '422':
 *          description: Error de validacion.
 */
UserEstresSesionRoutes.post('/userestresessions/assign', userEstresSessionController_1.default.assignEstresNivel);
exports.default = UserEstresSesionRoutes;

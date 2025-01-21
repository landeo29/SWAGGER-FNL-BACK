"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstresNivelController_1 = __importDefault(require("../controllers/Clasificacion/EstresNivelController"));
const EstresNivelesRoutes = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /estresniveles/{id}/nombre:
 *    get:
 *      tags:
 *        - Niveles de Estress
 *      summary: "Obtener nombre de nivel"
 *      description: Este endpoint para obtener el nombre del nivel
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID para buscar
 *          required: true
 *      responses:
 *        '200':
 *          description: Retorna el nombre del nivel.
 *        '422':
 *          description: Error de validacion.
 */
EstresNivelesRoutes.get("/estresniveles/:id/nombre", EstresNivelController_1.default.getNombreById);
exports.default = EstresNivelesRoutes;

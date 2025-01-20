"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MaintanceController_1 = __importDefault(require("../controllers/Global/MaintanceController"));
const MaintanceRoutes = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /range-age:
 *    get:
 *      tags:
 *        - Maintance
 *      summary: "Ruta para obtener el rango de edad"
 *      description: Este endpoint es para obtener el rango de edad
 *      responses:
 *        '200':
 *          description: Retorna todos los rangos de edad
 *        '422':
 *          description: Error de validacion.
 */
MaintanceRoutes.get("/range-age", MaintanceController_1.default.RangeAge);
/**
 * Post track
 * @openapi
 * /hierarchical-level:
 *    get:
 *      tags:
 *        - Maintance
 *      summary: "Ruta para obtener los niveles jerárquicos"
 *      description: Este endpoint es para obtener los niveles jerárquicos
 *      responses:
 *        '200':
 *          description: Retorna todos los niveles jerárquicos
 *        '422':
 *          description: Error de validacion.
 */
MaintanceRoutes.get("/hierarchical-level", MaintanceController_1.default.Hierarchical);
/**
 * Post track
 * @openapi
 * /responsability-level:
 *    get:
 *      tags:
 *        - Maintance
 *      summary: "Ruta para obtener los niveles de responsabilidad"
 *      description: Este endpoint es para obtener los niveles de responsabilidad
 *      responses:
 *        '200':
 *          description: Retorna todos los niveles de responsabilidad
 *        '422':
 *          description: Error de validacion.
 */
MaintanceRoutes.get("/responsability-level", MaintanceController_1.default.Responsability);
/**
 * Post track
 * @openapi
 * /gender:
 *    get:
 *      tags:
 *        - Maintance
 *      summary: "Ruta para obtener los géneros"
 *      description: Este endpoint es para obtener los géneros
 *      responses:
 *        '200':
 *          description: Retorna todos los géneros
 *        '422':
 *          description: Error de validacion.
 */
MaintanceRoutes.get("/gender", MaintanceController_1.default.Gender);
exports.default = MaintanceRoutes;

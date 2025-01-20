"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestEstresController_1 = __importDefault(require("../controllers/Test/TestEstresController"));
const TestEstresRoutes = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /guardarTestEstres:
 *    post:
 *      tags:
 *        - Test Estress
 *      summary: "Crear test estress de un usuario"
 *      description: Este endpoint es para crear un test de estress
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y datos almacenados
 *        '422':
 *          description: Error de validacion.
 */
TestEstresRoutes.post('/guardarTestEstres', TestEstresController_1.default.saveTestEstres);
/**
 * Post track
 * @openapi
 * /listarTestEstres:
 *    get:
 *      tags:
 *        - Test Estress
 *      summary: "Listar todos los test de estress"
 *      description: Este endpoint es para listar todos los test de estress
 *      responses:
 *        '200':
 *          description: Retorna el listado de todos los test de estress
 *        '422':
 *          description: Error de validacion.
 */
TestEstresRoutes.get('/listarTestEstres', TestEstresController_1.default.getAllTestEstres);
exports.default = TestEstresRoutes;

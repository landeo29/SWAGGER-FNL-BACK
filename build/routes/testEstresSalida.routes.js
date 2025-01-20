"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestEstresSalidaController_1 = __importDefault(require("../controllers/Test/TestEstresSalidaController"));
const TestEstresSalidaRoutes = (0, express_1.Router)();
/**
 * Post track
 * @openapi
 * /guardarTestEstresSalida:
 *    post:
 *      tags:
 *        - Test Estress Salida
 *      summary: "Crear test estress de salida para un usuario"
 *      description: Este endpoint es para crear un test de estress
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y datos almacenados
 *        '422':
 *          description: Error de validacion.
 */
TestEstresSalidaRoutes.post('/guardarTestEstresSalida', TestEstresSalidaController_1.default.saveTestEstresSalida);
/**
 * Post track
 * @openapi
 * /listarTestEstresSalida:
 *    get:
 *      tags:
 *        - Test Estress Salida
 *      summary: "Listar todos los test de estress de salida"
 *      description: Este endpoint es para listar todos los test de estress de salida
 *      responses:
 *        '200':
 *          description: Retorna el listado de todos los test de estress de salida
 *        '422':
 *          description: Error de validacion.
 */
TestEstresSalidaRoutes.get('/listarTestEstresSalida', TestEstresSalidaController_1.default.getAllTestEstresSalida);
exports.default = TestEstresSalidaRoutes;

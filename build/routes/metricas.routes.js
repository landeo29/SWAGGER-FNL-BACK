"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MetricasController_1 = __importDefault(require("../controllers/Metricas/MetricasController"));
const MetricasRouter = (0, express_1.Router)();
const metricasController = new MetricasController_1.default();
/**
 * Post track
 * @openapi
 * /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Perfil del Usuario"
 *      description: Este endpoint es para obtener los datos para el Perfil
 *      responses:
 *        '200':
 *          description: Retorna los Datos del Perfil
 *        '422':
 *          description: Error de validacion.
 */
MetricasRouter.get("/total_empleados", metricasController.TotalEmpleados);
MetricasRouter.get("/EmpleadosEstressPorcentaje", metricasController.EmpleadosEstressPorcentaje);
MetricasRouter.get("/UsanFuncyHoy", metricasController.EmpleadosUsaronFuncy);
exports.default = MetricasRouter;

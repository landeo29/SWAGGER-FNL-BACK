import { Router } from "express"
import MetricasController from "../controllers/Metricas/MetricasController";

const MetricasRouter = Router();
const metricasController = new MetricasController();
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


export default MetricasRouter;
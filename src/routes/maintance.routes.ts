import { Router } from "express";
import MaintanceController from "../controllers/Global/MaintanceController";

const MaintanceRoutes = Router();
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
MaintanceRoutes.get("/range-age", MaintanceController.RangeAge);

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
MaintanceRoutes.get("/hierarchical-level", MaintanceController.Hierarchical);

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
MaintanceRoutes.get("/responsability-level", MaintanceController.Responsability);

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
MaintanceRoutes.get("/gender", MaintanceController.Gender);


export default MaintanceRoutes;
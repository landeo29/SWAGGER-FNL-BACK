import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import ActivityController from "../controllers/Global/ActivityController";

const ActivityRouter = Router();

/**
 * Post track
 * @openapi
 * /add:
 *    post:
 *      tags:
 *        - Activity
 *      summary: "Agregar nueva Actividad"
 *      description: Este endpoint es crear una nueva actividad (la tabla que usa en db no esta creada)
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  description:
 *                      type: string
 *                      example: "Respiracion"
 *                  date:
 *                      type: string
 *                      example: "2025-01-13"
 *      responses:
 *        '200':
 *          description: Retorna el Token
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */
ActivityRouter.post('/add', verifyToken, ActivityController.addActivity);

/**
 * Post track
 * @openapi
 * /list:
 *    get:
 *      tags:
 *        - Activity
 *      summary: "Listar Actividad"
 *      description: Este endpoint es crear una nueva actividad (la tabla que usa en db no esta creada)
 *      responses:
 *        '200':
 *          description: Retorna el Token
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */
ActivityRouter.get('/list', verifyToken, ActivityController.getUserActivities);

export default ActivityRouter;
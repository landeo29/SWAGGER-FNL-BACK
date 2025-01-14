import { Router } from "express";
import EstresTecnicasController from "../controllers/Clasificacion/EstresTecnicasController";

const EstresTecnicasRoutes = Router();

// CRUD routes

/**
 * Post track
 * @openapi
 * /estrestecnicas:
 *    get:
 *      tags:
 *        - Estres Tecnicas
 *      summary: "Obtener todas las tecnicas"
 *      description: Este endpoint es para listar todas las tecnicas
 *      responses:
 *        '200':
 *          description: Retorna un listado de tecnicas
 *        '422':
 *          description: Error de validacion.
 */
EstresTecnicasRoutes.get('/estrestecnicas', EstresTecnicasController.getAll);


/**
 * Post track
 * @openapi
 * /estrestecnicas/{id}:
 *    get:
 *      tags:
 *        - Estres Tecnicas
 *      summary: "Obtener tecnica segun ID"
 *      description: Este endpoint para obtener una tecnica
 *      parameters: 
 *        - name: id
 *          in: path
 *          description: ID de la tecnica
 *          required: true
 *      responses:
 *        '200':
 *          description: Retorna el nombre del nivel.
 *        '422':
 *          description: Error de validacion.
 */
EstresTecnicasRoutes.get('/estrestecnicas/:id', EstresTecnicasController.getById);

/**
 * Post track
 * @openapi
 * /estrestecnicas:
 *    post:
 *      tags:
 *        - Estres Tecnicas
 *      summary: "Obtener tecnica segun ID"
 *      description: Este endpoint para obtener una tecnica
 *      requestBody:
 *          content:
 *            application/octet-stream:
 *              schema:
 *                $ref: "#/components/schemas/estresTecnica"
 *      responses:
 *        '200':
 *          description: Retorna el nombre del nivel.
 *        '422':
 *          description: Error de validacion.
 */
EstresTecnicasRoutes.post('/estrestecnicas', EstresTecnicasController.create);

/**
 * Post track
 * @openapi
 * /estrestecnicas/{id}:
 *    put:
 *      tags:
 *        - Estres Tecnicas
 *      summary: "Actualizar una tecnica"
 *      description: Este endpoint para actualizar una tecnica, se necesita el id
 *      parameters: 
 *        - name: id
 *          in: path
 *          description: ID de la tecnica
 *          required: true
 *      requestBody:
 *          content:
 *            application/octet-stream:
 *              schema:
 *                $ref: "#/components/schemas/estresTecnica"
 *      responses:
 *        '200':
 *          description: Retorna datos actualizados
 *        '422':
 *          description: Error de validacion.
 */
EstresTecnicasRoutes.put('/estrestecnicas/:id', EstresTecnicasController.update);

/**
 * Post track
 * @openapi
 * /estrestecnicas/{id}:
 *    delete:
 *      tags:
 *        - Estres Tecnicas
 *      summary: "Eliminar tecnica"
 *      description: Este endpoint para eliminar una tecnica, se necesita el ID
 *      parameters: 
 *        - name: id
 *          in: path
 *          description: ID de la tecnica
 *          required: true
 *      responses:
 *        '200':
 *          description: Retorna mensaje de confirmacion.
 *        '422':
 *          description: Error de validacion.
 */
EstresTecnicasRoutes.delete('/estrestecnicas/:id', EstresTecnicasController.delete);

// Ruta para generar técnicas de estrés automáticamente

/**
 * Post track
 * @openapi
 * /generador-tecnicas/{userId}:
 *    post:
 *      tags:
 *        - Estres Tecnicas
 *      summary: "Actualizar una tecnica"
 *      description: Este endpoint para generar un conjunto de tecnicas especificas para un usuario, se usa openai para la generacion
 *      parameters: 
 *        - name: userId
 *          in: path
 *          description: ID del usuario
 *          required: true
 *      requestBody:
 *          content:
 *            application/octet-stream:
 *              schema:
 *                type: object
 *                properties:
 *                  stressType:
 *                      type: string
 *                      example: "Respiracion Profunda"
 *      responses:
 *        '200':
 *          description: Retorna datos actualizados
 *        '422':
 *          description: Error de validacion.
 */
EstresTecnicasRoutes.post('/generador-tecnicas/:userId', EstresTecnicasController.generadorEstresTecnicas);

export default EstresTecnicasRoutes;
import {Router} from "express"
import TipoTecnicasController from "../controllers/Clasificacion/TipoTecnicasController";

const TipoTecnicasRoutes = Router();

// CRUD routes
/**
 * Post track
 * @openapi
 * /tipotecnicas:
 *    get:
 *      tags:
 *        - Tipo Tecnicas
 *      summary: "Todos los tipos de tecnica"
 *      description: Este endpoint es para obtener todas las Tecnicas Existentes
 *      responses:
 *        '200':
 *          description: Retorna todos los tipos de tecnica
 *        '422':
 *          description: Error de validacion.
 */
TipoTecnicasRoutes.get('/tipotecnicas', TipoTecnicasController.getAll);

/**
 * Post track
 * @openapi
 * /tipotecnicas/{id}:
 *    get:
 *      tags:
 *        - Tipo Tecnicas
 *      summary: "Tipo de tecnica segun id"
 *      description: Este endpoint es para obtener un tipo de tecnica segun el id
 *      parameters: 
 *        - name: id
 *          in: path
 *          description: ID del tipo de tecnica
 *          required: true
 *      responses:
 *        '200':
 *          description: Retorna el tipo de tecnica buscado
 *        '422':
 *          description: Error de validacion.
 */
TipoTecnicasRoutes.get('/tipotecnicas/:id', TipoTecnicasController.getById);

/**
 * Post track
 * @openapi
 * /tipotecnicas:
 *    post:
 *      tags:
 *        - Tipo Tecnicas
 *      summary: "Crear tipo de tecnica"
 *      description: Este endpoint es para crear un nuevo tipo de tecnica
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  nombre:
 *                      type: string
 *                      example: Respiracion
 *      responses:
 *        '200':
 *          description: Retorna el tipo de tecnica buscado
 *        '422':
 *          description: Error de validacion.
 */
TipoTecnicasRoutes.post('/tipotecnicas', TipoTecnicasController.create);

/**
 * Post track
 * @openapi
 * /tipotecnicas/{id}:
 *    put:
 *      tags:
 *        - Tipo Tecnicas
 *      summary: "Tipo de tecnica segun id"
 *      description: Este endpoint es para obtener un tipo de tecnica segun el id
 *      parameters: 
 *        - name: id
 *          in: path
 *          description: ID del tipo de tecnica
 *          required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  nombre:
 *                      type: string
 *                      example: Respiracion
 *      responses:
 *        '200':
 *          description: Retorna el tipo de tecnica actualizada
 *        '422':
 *          description: Error de validacion.
 */
TipoTecnicasRoutes.put('/tipotecnicas/:id', TipoTecnicasController.update);

/**
 * Post track
 * @openapi
 * /tipotecnicas/{id}:
 *    delete:
 *      tags:
 *        - Tipo Tecnicas
 *      summary: "Eliminar tipo de tecnica segun ID"
 *      description: Este endpoint es para eliminar un tipo de tecnica segun su id
 *      parameters: 
 *        - name: id
 *          in: path
 *          description: ID del tipo de tecnica
 *          required: true
 *          schema:
 *              type: int64
 *      responses:
 *        '200':
 *          description: Mensaje de confirmacion
 *        '422':
 *          description: Error de validacion.
 */
TipoTecnicasRoutes.delete('/tipotecnicas/:id', TipoTecnicasController.delete);

export default TipoTecnicasRoutes;
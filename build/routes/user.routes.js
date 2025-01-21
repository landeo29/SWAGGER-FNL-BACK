"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/User/userController"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const UserRoutes = (0, express_1.Router)();
// Rutas de usuario
/**
 * Post track
 * @openapi
 * /login:
 *    post:
 *      tags:
 *        - Users
 *      summary: "Logear Usuario"
 *      description: Este endpoint es para Logear al Usuario
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/login"
 *      responses:
 *        '200':
 *          description: Retorna el Token
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.post('/login', userController_1.default.login);
/**
 * Post track
 * @openapi
 * /register:
 *    post:
 *      tags:
 *        - Users
 *      summary: "Registrar Usuario"
 *      description: Este endpoint es para Registrar al Usuario
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el Token
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.post('/register', userController_1.default.createUser);
// Rutas sin middleware de token
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
UserRoutes.get('/users', userController_1.default.getAllUsers);
/**
 * Post track
 * @openapi
 * /users/{userId}:
 *    put:
 *      tags:
 *        - Users
 *      summary: "Actualizar datos del Usuario"
 *      description: Este endpoint es para actualizar datos del Usuario
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y datos actualizados del Usuario
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.put('/users/:id', userController_1.default.updateUser);
/**
 * Post track
 * @openapi
 * /datos/users/{userId}:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Datos del Usuario"
 *      description: Este endpoint es para obtener los datos del Usuario
 *      responses:
 *        '200':
 *          description: Retorna los Datos del Usuario
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.get('/datos/users/:id', userController_1.default.getUserById);
/**
 * Post track
 * @openapi
 * /perfilUsuario/{userId}:
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
UserRoutes.get('/perfilUsuario/:id', userController_1.default.getUserProfile);
/**
 * Post track
 * @openapi
 * /actualizarPerfil/{userId}:
 *    post:
 *      tags:
 *        - Users
 *      summary: "Actualizar Perfil del Usuario"
 *      description: Este endpoint es para actualizar los datos para el Perfil
 *      parameters:
 *        - name: userId
 *          in: path
 *          description: ID del usuario necesario
 *          required: true
 *      requestBody:
 *          content:
 *            application/octet-stream:
 *              schema:
 *                $ref: "#/components/schemas/userProfile"
 *      responses:
 *        '200':
 *          description: Retorna los Datos nuevos del Perfil
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.post('/actualizarPerfil/:id', uploadMiddleware_1.default, userController_1.default.updateProfile);
exports.default = UserRoutes;

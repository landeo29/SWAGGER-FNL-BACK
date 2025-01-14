"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/User/userController"));
const UserRoutes = (0, express_1.Router)();
// Rutas de usuario
/**
 * Post track
 * @openapi
 * /login:
 *    post:
 *      tags:
 *        - users
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
 *      security:
 *       - bearerAuth: []
 */
UserRoutes.post('/login', userController_1.default.login);
/**
 * Post track
 * @openapi
 * /register:
 *    post:
 *      tags:
 *        - users
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
 *      security:
 *       - bearerAuth: []
 */
UserRoutes.post('/register', userController_1.default.createUser);
// Rutas sin middleware de token
//UserRoutes.get('/users', userController.getAllUsers);
//UserRoutes.put('/users/:id', userController.updateUser);
//UserRoutes.get('/datos/users/:id', userController.getUserById);\
/**
 * Post track
 * @openapi
 * /users:
 *    get:
 *      tags:
 *        - users
 *      summary: "Perfil del Usuario"
 *      description: Este endpoint es para obtener los datos para el Perfil
 *      responses:
 *        '200':
 *          description: Retorna los Datos del Perfil
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */
UserRoutes.get('/perfilUsuario/:id', userController_1.default.getUserProfile);
//UserRoutes.post('/actualizarPerfil/:id', upload, userController.updateProfile);
exports.default = UserRoutes;

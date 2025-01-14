"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../models/User/user");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const user_responses_1 = require("../../models/User/user_responses");
class UserController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield user_1.User.findOne({ where: { username } });
                if (!user) {
                    return res.status(401).json({ error: "Credenciales inválidas" });
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: "Credenciales inválidas" });
                }
                const jwt_secret = process.env.JWT_SECRET || "";
                const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, jwt_secret, { expiresIn: "1h" });
                return res.status(200).json({
                    message: "Login exitoso",
                    token,
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    permisopoliticas: user.permisopoliticas,
                    userresponsebool: user.userresponsebool,
                    testestresbool: user.testestresbool,
                });
            }
            catch (error) {
                console.error("Error en el login:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = req.body;
            const file = req.file; // Ahora usamos req.file, ya que es un solo archivo
            try {
                // Validaciones básicas
                if (!username || !password || !email) {
                    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
                }
                // Manejo de la imagen
                let profileImagePath = null;
                if (file) {
                    const uploadDir = path_1.default.join(__dirname, '../imagenes');
                    if (!fs_1.default.existsSync(uploadDir)) {
                        fs_1.default.mkdirSync(uploadDir, { recursive: true });
                    }
                    //nunca estaba siendo usado
                    //const fileName = `${Date.now()}-${file.filename}`;
                    profileImagePath = `/imagenes/${file.filename}`;
                }
                // Encriptar contraseña
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                // Crear usuario
                const user = yield user_1.User.create({
                    username,
                    password: hashedPassword,
                    email,
                    profileImage: profileImagePath,
                    created_at: new Date(),
                });
                res.status(201).json({ message: 'Usuario creado correctamente.', data: user });
            }
            catch (error) {
                console.error('Error al crear el usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProfile = yield user_responses_1.UserResponses.findOne({
                    where: { user_id: req.params.id }
                });
                if (!userProfile) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                const response = {
                    email: userProfile.user.email,
                    hierarchicalLevel: userProfile.hierarchical_level.level,
                    gender_id: userProfile.gender_id,
                    profileImage: userProfile.user.profileImage,
                };
                return res.json(response);
            }
            catch (error) {
                console.error('Error al obtener el perfil de usuario:', error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.default = new UserController();

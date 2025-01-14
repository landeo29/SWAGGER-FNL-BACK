"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de multer para almacenar las imágenes
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        // Directorio donde se almacenarán las imágenes
        cb(null, path_1.default.join(__dirname, '../imagenes')); // Ajusta el path según tu estructura
    },
    filename: (_req, file, cb) => {
        // Crear un nombre único para cada imagen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Mantener la extensión original
    },
});
// Crear un middleware de multer para manejar el archivo
const upload = (0, multer_1.default)({ storage: storage }).single('profileImage'); // 'profileImage' es el nombre del campo en el formulario
exports.default = upload;

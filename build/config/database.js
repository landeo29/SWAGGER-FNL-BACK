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
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = __importDefault(require("../models/models"));
class Database {
    constructor() {
        this.connection = null;
        this.init();
    }
    init() {
        try {
            const name = process.env.DB_NAME || 'fnlprueba';
            console.log(name);
            const user = process.env.DB_USER || 'paul';
            const password = process.env.DB_PASSWORD || 'paulp';
            const host = process.env.DB_HOST || 'localhost';
            const dialect = process.env.DB_DIALECT || 'mysql';
            const port = parseInt(process.env.DB_PORT || '3306');
            this.connection = new sequelize_typescript_1.Sequelize(name, user, password, {
                host,
                dialect,
                port,
                retry: { max: 3 },
                models: models_1.default
            });
        }
        catch (error) {
            console.error("Error al conectar a la base de datos:", error);
        }
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Autenticar la conexión
                yield ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.authenticate());
                console.log("Conexión a la base de datos establecida correctamente.");
                // Sincronizar los modelos con la base de datos
                yield ((_b = this.connection) === null || _b === void 0 ? void 0 : _b.sync({ alter: true }));
                console.log("Base de datos sincronizada correctamente.");
            }
            catch (err) {
                console.error("Error al conectar o sincronizar con la base de datos:", err);
                console.error("Detalles de la conexión:", {
                    database: process.env.DB_NAME,
                    user: process.env.DB_USER,
                    host: process.env.DB_HOST,
                    dialect: process.env.DB_DIALECT,
                    port: process.env.DB_PORT,
                });
            }
        });
    }
}
exports.default = new Database();

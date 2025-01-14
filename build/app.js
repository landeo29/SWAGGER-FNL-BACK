"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use((0, cors_1.default)({
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            optionsSuccessStatus: 204,
        }));
        this.server.use(body_parser_1.default.json());
        this.server.use("/imagenes", express_1.default.static(path_1.default.join(__dirname, "imagenes")));
        this.server.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    }
    routes() {
        // Configuración de rutas
        //this.server.use("/api", messagesRouter);
        //this.server.use("/api", usersRouter);
        //this.server.use("/api", openaiRouter);
        //this.server.use("/api", activityRouter);
        //this.server.use("/api/v1/maintance", maintanceRouter);
        //this.server.use("/api", userResponseRoutes);
        //this.server.use("/api", testEstresRoutes);
        //this.server.use("/api", estresNiveles);
        //this.server.use("/api", userEstresSession);
        //this.server.use("/api", userPrograma);
        //this.server.use("/api", estresTecnicas);
        //this.server.use("/api", tipoTecnicas);
        //this.server.use("/api", testEstresSalidaRoutes);
    }
    getServer() {
        return this.server;
    }
}
exports.default = new App().getServer();

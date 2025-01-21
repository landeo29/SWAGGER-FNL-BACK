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
const messages_routes_1 = __importDefault(require("./routes/messages.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const openai_routes_1 = __importDefault(require("./routes/openai.routes"));
const maintance_routes_1 = __importDefault(require("./routes/maintance.routes"));
const userResponse_routes_1 = __importDefault(require("./routes/userResponse.routes"));
const testEstres_routes_1 = __importDefault(require("./routes/testEstres.routes"));
const estresNiveles_routes_1 = __importDefault(require("./routes/estresNiveles.routes"));
const userestressesion_routes_1 = __importDefault(require("./routes/userestressesion.routes"));
const userprograma_routes_1 = __importDefault(require("./routes/userprograma.routes"));
//import TipoTecnicasRoutes from "./routes/tipotecnicas.routes";
const testEstresSalida_routes_1 = __importDefault(require("./routes/testEstresSalida.routes"));
const metricas_routes_1 = __importDefault(require("./routes/metricas.routes"));
const empresa_routes_1 = __importDefault(require("./routes/empresa.routes"));
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
        this.server.use("/api", user_routes_1.default);
        this.server.use("/api/v1/maintance", maintance_routes_1.default);
        this.server.use("/api", testEstres_routes_1.default);
        this.server.use("/api", messages_routes_1.default);
        this.server.use("/api", openai_routes_1.default);
        this.server.use("/api", estresNiveles_routes_1.default);
        this.server.use("/api", userestressesion_routes_1.default);
        this.server.use("/api", userResponse_routes_1.default);
        this.server.use("/api/userprograma", userprograma_routes_1.default);
        this.server.use("/api", testEstresSalida_routes_1.default); //cambiar ruta
        this.server.use("/api/metricas", metricas_routes_1.default);
        this.server.use("/api/empresa", empresa_routes_1.default);
        //this.server.use("/api", TipoTecnicasRoutes);
    }
    getServer() {
        return this.server;
    }
}
exports.default = new App().getServer();

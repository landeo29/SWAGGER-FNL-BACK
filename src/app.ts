import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./config/swagger"
class App {
  private server: Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  private middlewares(): void {
    this.server.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 204,
      })
    );
    this.server.use(bodyParser.json());
    this.server.use(
      "/imagenes",
      express.static(path.join(__dirname, "imagenes"))
    );
    this.server.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))
  }
  private routes(): void {
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
  public getServer(): Application {
    return this.server;
  }
}

export default new App().getServer();

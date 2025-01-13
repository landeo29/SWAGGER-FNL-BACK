import { Sequelize, Dialect } from "sequelize";
import models from '../models/models';

class Database {
  private connection: Sequelize | null;
  
  constructor() {
    this.connection = new Sequelize(
      process.env.DB_NAME || 'fnl',
      process.env.DB_USER || 'paul',
      process.env.DB_PASSWORD || 'paulp',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
        port: parseInt(process.env.DB_PORT || '3306'),
        retry: { max: 3 },
      }
    );
    this.init();
  }

  init() {
    try {
      Object.values(models).forEach((model: any) => {
        if(typeof model.initModel === "function"){
          model.initModel(this.connection)
        }
      });
      Object.values(models).forEach((model: any) => {
        if (typeof model.associate === "function") {
          model.associate(models);
        }
      });
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
  }
  async sync() {
    try {
      // Autenticar la conexión
      await this.connection?.authenticate();
      console.log("Conexión a la base de datos establecida correctamente.");

      // Sincronizar los modelos con la base de datos
      await this.connection?.sync({ alter: false });
      console.log("Base de datos sincronizada correctamente.");

    } catch (err) {
      console.error("Error al conectar o sincronizar con la base de datos:", err);
      console.error("Detalles de la conexión:", {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
      });
    }
  }
}

export default new Database();
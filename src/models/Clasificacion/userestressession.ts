import { DataTypes, Model, Sequelize } from "sequelize";

class UserEstresSession extends Model {
  static initModel(sequelize: Sequelize): typeof UserEstresSession {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true, // Clave primaria autoincremental
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false, // Campo obligatorio
          references: {
            model: "users", // Referencia a la tabla de usuarios
            key: "id",
          },
          onUpdate: "CASCADE", // Actualización en cascada
          onDelete: "CASCADE", // Eliminación en cascada
        },
        estres_nivel_id: {
          type: DataTypes.INTEGER,
          allowNull: false, // Campo obligatorio
          references: {
            model: "estres_niveles", // Referencia a la tabla de niveles de estrés
            key: "id",
          },
          onUpdate: "CASCADE", // Actualización en cascada
          onDelete: "CASCADE", // Eliminación en cascada
        },
      },
      {
        sequelize,
        timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
        tableName: "user_estres_sessions", // Nombre de la tabla en la base de datos
      }
    );
    return this;
  }
}

export default UserEstresSession;
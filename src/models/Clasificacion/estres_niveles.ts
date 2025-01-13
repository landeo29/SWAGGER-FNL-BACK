import { DataTypes, Model, Sequelize } from "sequelize";

class EstresNiveles extends Model {
  static initModel(sequelize: Sequelize): typeof EstresNiveles {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true, // Clave primaria autoincremental
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false, // El nombre es obligatorio
        },
        descripcion: {
          type: DataTypes.TEXT,
          allowNull: true, // Puede ser nulo si no hay descripción
        },
      },
      {
        sequelize,
        timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
        tableName: "estres_niveles", // Nombre de la tabla en la base de datos
      }
    );
    return this;
  }
}

export default EstresNiveles;
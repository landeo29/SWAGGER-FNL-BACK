import { DataTypes, Model, Sequelize } from "sequelize";

class EstresTecnicas extends Model {
  static initModel(sequelize: Sequelize): typeof EstresTecnicas {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true, // Clave primaria autoincremental
        },
        nombre: {
          type: DataTypes.STRING(255),
          allowNull: false, // El nombre no puede ser nulo
        },
        mensaje: {
          type: DataTypes.TEXT, // Campo de texto para el mensaje
          allowNull: true, // Puede ser nulo si no hay mensaje
        },
        steps: {
          type: DataTypes.TEXT, // Campo de texto para almacenar los pasos
          allowNull: true, // Los pasos pueden ser nulos
        },
        tipo: {
          type: DataTypes.STRING(45), // Máximo 45 caracteres para el campo "tipo"
          allowNull: true, // Puede ser nulo si no hay tipo definido
        },
        icon: {
          type: DataTypes.STRING(255),
          allowNull: true, // El nombre no puede ser nulo
        },
        tipotecnicas_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "tipotecnicas", // Nombre de la tabla referenciada
            key: "id", // Clave primaria de la tabla tipotecnicas
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE", // Borra la técnica si se elimina el tipo de técnica
        },
        user_id: {
          // Nuevo campo para el usuario
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        timestamps: false,  // Si no necesitas `createdAt` y `updatedAt`
        tableName: 'estrestecnicas',  // Nombre de la tabla en la base de datos
      }
    );
    return this;
  }
}
export default EstresTecnicas;
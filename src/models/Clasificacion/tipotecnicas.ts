import { DataTypes, Model, Sequelize } from "sequelize";

class TipoTecnicas extends Model {
  static initModel(sequelize: Sequelize): typeof TipoTecnicas {
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
      },
      {
        sequelize,
        timestamps: false,
        tableName: "tipotecnicas",
      }
    );
    return this;
  }
}
export default TipoTecnicas;

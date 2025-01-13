import { DataTypes, Model, Sequelize } from "sequelize";

class Hierarchical_level extends Model {
  static initModel(sequelize: Sequelize): typeof Hierarchical_level {
    super.init(
      {
        level: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, // attributes
      {
        sequelize,
        timestamps: false,
        tableName: "hierarchical_level",
      }
    );

    return this;
  }
}

export default Hierarchical_level;

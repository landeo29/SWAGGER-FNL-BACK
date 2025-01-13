import { DataTypes, Model, Sequelize } from "sequelize";

class AgeRange extends Model {
  static initModel(sequelize: Sequelize): typeof AgeRange {
    super.init(
      {
        age_range: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, // attributes
      {
        sequelize,
        timestamps: false,
        tableName: "age_range",
      }
    );

    return this;
  }
}

export default AgeRange;

import { DataTypes, Model, Sequelize } from 'sequelize';

class ResponsabilityLevel extends Model {
  static initModel(sequelize: Sequelize): typeof ResponsabilityLevel {
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
        tableName: 'responsability_level', 
      }
    );

    return this;
  }
}

export default ResponsabilityLevel;

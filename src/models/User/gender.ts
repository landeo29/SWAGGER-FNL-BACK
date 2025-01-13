import { DataTypes, Model, Sequelize } from 'sequelize';

class Gender extends Model {
  static initModel(sequelize: Sequelize): typeof Gender {
    super.init(
      {
        gender:{
            type: DataTypes.STRING,
            allowNull: false
        }
      }, // attributes
      {
        sequelize,
        timestamps: false,
        tableName: 'gender'
      }
    );
    return this;
  }
}

export default Gender;

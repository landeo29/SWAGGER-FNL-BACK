import { DataTypes, Model, Sequelize } from "sequelize";

class UserResponse extends Model {
  static initModel(sequelize: Sequelize): typeof UserResponse {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        age_range_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "age_range",
            key: "id",
          },
        },
        hierarchical_level_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "hierarchical_level",
            key: "id",
          },
        },
        responsability_level_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "responsability_level",
            key: "id",
          },
        },
        gender_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "gender",
            key: "id",
          },
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: "user_responses",
      }
    );
    return this;
  }
}

export default UserResponse;

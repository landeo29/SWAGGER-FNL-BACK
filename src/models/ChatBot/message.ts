import { DataTypes, Model, Sequelize } from "sequelize";
import User from "../User/user";

class Message extends Model {
  static initModel(sequelize: Sequelize): typeof Message {
    super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        user_id_receptor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        sentimientos: {
          type: DataTypes.STRING,
        },
        factor_psicosocial: {
          type: DataTypes.STRING,
        },
        score: {
          type: DataTypes.INTEGER,
        },
        keyword_frequency: {
          type: DataTypes.TEXT,
        },
        message_length: {
          type: DataTypes.INTEGER,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      }, // attributes
      {
        sequelize,
        timestamps: false,
        tableName: "messages",
      }
    );

    return this;
  }
}

export default Message;

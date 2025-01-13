import { DataTypes, Model, Sequelize } from "sequelize";

class UserPrograma extends Model {
  static initModel(sequelize: Sequelize): typeof UserPrograma {
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
              model: 'users',  // Relacionado con la tabla 'users'
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          dia: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          nombre_tecnica: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          tipo_tecnica: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          guia: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          comentario: {
            type: DataTypes.TEXT,  // Comentarios del usuario sobre la técnica
            allowNull: true,
          },
          estrellas: {
            type: DataTypes.INTEGER,  // Calificación con estrellas
            allowNull: true,  // Puedes ajustarlo si prefieres que sea obligatorio
            validate: {
              min: 1,  // Validación para asegurarse de que la calificación sea al menos 1
              max: 5,  // Validación para asegurarse de que la calificación no supere 5
            },
          },
          start_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,  // Valor por defecto de la fecha de inicio es el momento actual
          },
          completed_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,  // Valor por defecto de la fecha de inicio es el momento actual
          },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'userprograma',
      }
    );
    return this;
  }
}
export default UserPrograma;

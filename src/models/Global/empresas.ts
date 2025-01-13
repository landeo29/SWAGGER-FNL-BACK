import { DataTypes, Model, Sequelize } from "sequelize";

class Empresas extends Model {
    static initModel(sequelize: Sequelize): typeof Empresas{
        super.init(
            {
                nombre:{
                    type: DataTypes.STRING
                },
                ruc:{
                    type: DataTypes.STRING
                },
            },
            {
                sequelize,
                timestamps: true,
                tableName: "empresas"
            }
        );
        return this;
    }
}
export default Empresas;
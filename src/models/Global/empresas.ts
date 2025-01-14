import { Column, DataType, Table, Model } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "empresas"
})
export class Empresas extends Model {
 
    @Column(DataType.STRING)
    nombre!: string;

    @Column(DataType.STRING)
    ruc!: string;
}
import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";
@Table({
  timestamps: false,
  tableName: "tipotecnicas"
})
export class TipoTecnicas extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  nombre!: string;

}
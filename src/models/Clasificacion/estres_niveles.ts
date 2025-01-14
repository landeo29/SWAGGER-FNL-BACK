
import { AllowNull, Column, DataType, Length, Model, Table } from "sequelize-typescript";


@Table({
  timestamps: false,
  tableName: "estres_niveles"
})
export class EstresNiveles extends Model {
  @AllowNull(false)
  @Length({min:2,max:50})
  @Column(DataType.STRING)
  nombre!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  descripcion!: string;

}

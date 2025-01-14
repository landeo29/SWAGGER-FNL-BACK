import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Length, Model, Table } from "sequelize-typescript";
import { User } from "../User/user";

@Table({
  timestamps: false,
  tableName: "userprograma"
})
export class UserPrograma extends Model {
  
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  dia!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  nombre_tecnica!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  tipo_tecnica!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  descripcion!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  guia!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  comentario!: string;

  @AllowNull(true)
  @Length({min: 1, max:5})
  @Column(DataType.INTEGER)
  estrellas!: number

  @AllowNull(true)
  @Default(null)
  @Column(DataType.DATE)
  start_date!: Date;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.DATE)
  completed_date!: Date;
}

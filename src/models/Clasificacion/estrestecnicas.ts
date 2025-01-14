import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Length, Model, Table } from "sequelize-typescript";
import { TipoTecnicas } from "./tipotecnicas";
import { User } from "../User/user";

@Table({
  timestamps: false,
  tableName: "estrestecnicas"
})
export class EstresTecnicas extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  nombre!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  mensaje!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  steps!: string;

  @AllowNull(true)
  @Length({min:2, max:45})
  @Column(DataType.STRING)
  tipo!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  icon!: string;

  @ForeignKey(() => TipoTecnicas)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  tipotecnicas_id!: number;
  
  @BelongsTo(() => TipoTecnicas)
  tipotecnicas!: TipoTecnicas;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number

  @BelongsTo(() => User)
  user!: User;
}
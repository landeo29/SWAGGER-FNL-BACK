import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "hierarchical_level",
})
export class Hierarchical_level extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  level!: string;
}

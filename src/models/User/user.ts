import {
  Model,
  Column,
  DataType,
  Table,
  AllowNull,
  Unique,
  Default,
  IsEmail,
  CreatedAt,
  HasMany,
} from "sequelize-typescript";
import { EstresTecnicas } from "../Clasificacion/estrestecnicas";
import { UserEstresSession } from "../Clasificacion/userestressession";
import { UserResponses } from "./user_responses";

@Table({
  timestamps:false,
  tableName: "users"
})
export class User extends Model {

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @IsEmail
  @Unique(true)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  permisopoliticas!: boolean;

  @AllowNull(true)
  @Default(0)
  @Column(DataType.INTEGER)
  funcyinteract!: number;

  
  @AllowNull(true)
  @Column(DataType.STRING)
  profileImage!: string;
  
  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  userresponsebool!: boolean;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  testestresbool!: boolean;

  @CreatedAt
  createdAt!: Date;

  @HasMany(() => EstresTecnicas)
  estrestecnicas!: EstresTecnicas[];

  @HasMany(() => UserEstresSession)
  userestressessions!: UserEstresSession[];

  @HasMany(() => UserResponses)
  userresponses!: UserResponses[];
}

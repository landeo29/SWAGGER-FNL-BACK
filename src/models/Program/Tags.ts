import { AllowNull, BelongsToMany, Model, Table } from "sequelize-typescript";
import { Column, DataType } from "sequelize-typescript";
import { Activitys } from "./activitys";
import { ActivityTags } from "./ActivityTags";

@Table({
    tableName: "tags"
})
export class Tags extends Model {
    
    @Column(DataType.STRING)
    nombre!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    description!: string;

    @BelongsToMany(() => Activitys, () => ActivityTags)
    tags!: Activitys[];
}
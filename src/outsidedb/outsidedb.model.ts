import {Column, DataType, Model, Table} from "sequelize-typescript";

interface USerCreationAttrs {
    email: string,
    password: string
}


@Table({tableName: 'outside'})
export class OutsideDb extends Model<OutsideDb> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true })
    id: Number;


    
}
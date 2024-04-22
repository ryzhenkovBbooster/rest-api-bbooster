import {Column, DataType, Model, Table} from "sequelize-typescript";


interface TokenCreationAttrs {
    TOKEN: string,
    REFRESH: string
}

@Table({tableName: 'huntflow'})
export class Huntflow extends Model<Huntflow, TokenCreationAttrs>{
    @Column({type: DataType.STRING,  allowNull:false, unique: true})
    TOKEN: string;

    @Column({type: DataType.STRING, allowNull:false, unique: true})
    REFRESH: string;
}
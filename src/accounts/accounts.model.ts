import {DataTypes} from "sequelize";
import {Column, DataType, Model, Table} from "sequelize-typescript";



interface AccCreationAttrs {
    fullName: string,
    email: string,
    creattionTime: string,
    active: boolean,
    deleteTime: string
}

@Table({tableName: 'accounts'})
export class Accounts extends Model<Accounts, AccCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: Number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    fullName: string;

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    email: string;

    @Column({type: DataType.DATEONLY, unique: false, allowNull: true  })
    creationTime: string


    @Column({type: DataType.BOOLEAN, defaultValue: true})
    active: boolean;

    @Column({type: DataType.DATEONLY, unique: false, allowNull: true})
    deleteTime: string


}
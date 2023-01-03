import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class ClientAddress extends Model<InferAttributes<ClientAddress>, InferCreationAttributes<ClientAddress>> {

    declare id: CreationOptional<number>;
    declare client_id: number;
    declare address: string;
    declare reference: string;
    declare zip_code: number;
    declare city_id: number;
    declare is_deleted: CreationOptional<boolean>;

}

export const initClientAddressModel = async (sequelize: Sequelize) => {
    ClientAddress.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
}, {
    tableName: 'client_address',
    sequelize // Instance of sequelize that reflects the connection
})

await ClientAddress.sync();

}
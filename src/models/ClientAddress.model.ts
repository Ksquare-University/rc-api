import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class ClientAddress extends Model<InferAttributes<ClientAddress>, InferCreationAttributes<ClientAddress>> {

    declare id: number;
    declare client_id: number;
    declare address: string;
    declare reference: string;
    declare zip_code: number;
    declare city_id: number;
    declare is_deleted: boolean;

}

export const initClientAddressModel = async (sequelize: Sequelize) => {
    ClientAddress.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_id: DataTypes.INTEGER,
        address: DataTypes.STRING,
        reference: DataTypes.STRING,
        zip_code: DataTypes.INTEGER,
        city_id: DataTypes.INTEGER,
        is_deleted: DataTypes.BOOLEAN
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})

await ClientAddress.sync();

}
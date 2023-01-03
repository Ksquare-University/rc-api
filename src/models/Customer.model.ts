import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {

    declare id: number;
    declare full_name: string;
    declare phone_number: number;
    declare user_id: number;
    declare status: boolean; 

}

export const initClientModel = async (sequelize: Sequelize) => {
    Client.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
        }
    
}, {
    tableName: 'customer',
    sequelize // Instance of sequelize that reflects the connection
})

    await Client.sync();

}
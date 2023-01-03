import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {

    declare id: CreationOptional<boolean>;
    declare full_name: string;
    declare phone_number: number;
    declare user_id: string;
    declare status: CreationOptional<boolean>; 

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
            allowNull: false
        },
        phone_number: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
}, {
    tableName: 'customer',
    sequelize // Instance of sequelize that reflects the connection
})

    await Client.sync();

}
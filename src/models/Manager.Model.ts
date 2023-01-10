import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Manager extends Model<InferAttributes<Manager>, InferCreationAttributes<Manager>> {
    declare id: CreationOptional<string>;
    declare restaurant_id: string;
    declare client_id: number;
}

export const initManager = (sequelize: Sequelize) => {
    Manager.init({
    
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        restaurant_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

}, { 
    tableName:"manager",
    sequelize
})
}

import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Manager extends Model<InferAttributes<Manager>, InferCreationAttributes<Manager>> {
    declare id: CreationOptional<string>;
    declare restaurant_id: string;
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

}, { 
    tableName:"order_status",
    sequelize
})
}

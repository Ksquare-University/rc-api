import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class OrderStatus extends Model<InferAttributes<OrderStatus>, InferCreationAttributes<OrderStatus>> {
    declare id: CreationOptional<string>;
    declare name: string;
}

export const initOrderStatus = (sequelize: Sequelize) => {
    OrderStatus.init({
    
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },

}, { 
    sequelize
})
}
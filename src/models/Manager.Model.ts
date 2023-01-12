import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class Manager extends Model<InferAttributes<Manager>, InferCreationAttributes<Manager>> {
    declare id: CreationOptional<number>;
    declare user_id: string;
    declare restaurant_id: number;

}

export const initManager = (sequelize: Sequelize) => {
    Manager.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

}, { 
    tableName:"manager",
    sequelize
})
}

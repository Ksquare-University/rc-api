import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class Restaurant extends Model<InferAttributes<Restaurant>, InferCreationAttributes<Restaurant>> {

    declare id: number;
    declare name: string;
    declare city_id: number;
    declare phone_number: string;
    declare user_id: number;
    declare is_deleted: boolean;

}

export const initRestaurantModel = async (sequelize: Sequelize) => {
    Restaurant.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        city_id: DataTypes.INTEGER,
        phone_number: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        is_deleted: DataTypes.BOOLEAN
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})

await Restaurant.sync();

}


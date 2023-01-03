import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class Restaurant extends Model<InferAttributes<Restaurant>, InferCreationAttributes<Restaurant>> {

    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare city_id: number;
    declare phone_number: string;
    declare user_id: number;
    declare is_deleted: CreationOptional<boolean>;

}

export const initRestaurantModel = async (sequelize: Sequelize) => {
    Restaurant.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        city_id: DataTypes.INTEGER,
        phone_number: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
}, {
    tableName: "Restaurant"
    sequelize // Instance of sequelize that reflects the connection
})

await Restaurant.sync();

}


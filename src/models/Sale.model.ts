import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class Sale extends Model<InferAttributes<Sale>, InferCreationAttributes<Sale>> {

    declare id: number;
    declare order_id: number;
    declare total_price: number;
    declare total_items: number;
    declare date: Date;
    declare payment_id: number; 
    declare address: string;
    declare city_id: number;
    declare refrences: CreationOptional<boolean>;
    declare is_deleted: CreationOptional<boolean>;

}

export const initSaleModel = async (sequelize: Sequelize) => {
    Sale.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        total_price: {
            type: DataTypes.DECIMAL
        },
        total_items: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        },
        payment_id: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        city_id: {
            type: DataTypes.INTEGER
        },
        refrences: {
            type: DataTypes.STRING
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    
}, {
    sequelize // Instance of sequelize that reflects the connection
})

    await Sale.sync();

}
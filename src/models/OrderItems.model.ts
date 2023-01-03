import {
    DataTypes,
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Sequelize
} from "sequelize";

export class OrderItems extends Model<InferAttributes<OrderItems>, InferCreationAttributes<OrderItems>> {
    declare id: CreationOptional<number>;
    declare order_id: number;
    declare item_id: number;
    declare quantity: CreationOptional<number>;
    declare is_deleted: CreationOptional<boolean>;
}
export const initOrderItemsModel = async (sequelize: Sequelize) => {
    OrderItems.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            item_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        },
        {
            tableName: "order_items",
            sequelize: sequelize,
        }
    );
    await OrderItems.sync();
};

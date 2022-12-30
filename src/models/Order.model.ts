import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare client_id: number;
  declare courier_id: number;
  declare order_status_id: CreationOptional<number>;
  declare restaurant_id: number;
}

export const initOrderModel = (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );
};

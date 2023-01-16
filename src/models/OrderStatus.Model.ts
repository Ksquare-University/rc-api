import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class OrderStatus extends Model<
  InferAttributes<OrderStatus>,
  InferCreationAttributes<OrderStatus>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

export const initOrderStatus = async (sequelize: Sequelize) => {
  OrderStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "order_status",
      sequelize,
    }
  );
  await OrderStatus.sync();
};

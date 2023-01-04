import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class PaymentMethod extends Model<
  InferAttributes<PaymentMethod>,
  InferCreationAttributes<PaymentMethod>
> {
  declare id: CreationOptional<number>;
  declare method: string;
  declare billing_details_id: CreationOptional<number>;
}

export const initPaymentMethodModel = async (sequelize: Sequelize) => {
  PaymentMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      billing_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "payment_methods",
      sequelize, // Instance of sequelize that reflects the connection
    }
  );

  await PaymentMethod.sync();
};

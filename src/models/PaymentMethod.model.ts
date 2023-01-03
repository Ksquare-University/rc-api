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
  declare id: number;
  declare method: string;
  declare billingDetailsId: number;
}

export const initPaymentMethodModel = async (sequelize: Sequelize) => {
  PaymentMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      method: DataTypes.STRING,
      billingDetailsId: DataTypes.INTEGER,
    },
    {
      tableName: "payment_method",
      sequelize, // Instance of sequelize that reflects the connection
    }
  );

  await PaymentMethod.sync();
};

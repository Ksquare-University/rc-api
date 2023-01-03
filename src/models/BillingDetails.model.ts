import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class BillingDetails extends Model<
  InferAttributes<BillingDetails>,
  InferCreationAttributes<BillingDetails>
> {
  declare id: number;
  declare ownerName: string;
  declare billingAddress: string;
  declare cardNumber: number;
  declare cvv: number;
  declare expirationDate: Date;
  declare clientId: number;
}

export const initBillingDetailsModel = async (sequelize: Sequelize) => {
  BillingDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ownerName: DataTypes.STRING,
      billingAddress: DataTypes.STRING,
      cardNumber: DataTypes.INTEGER,
      cvv: DataTypes.INTEGER,
      expirationDate: DataTypes.DATE,
      clientId: DataTypes.INTEGER,
    },
    {
      tableName: "billing_details",
      sequelize, // Instance of sequelize that reflects the connection
    }
  );

  await BillingDetails.sync();
};

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
  declare id: CreationOptional<number>;
  declare owner_name: string;
  declare billing_address: string;
  declare card_number: number;
  declare cvv: number;
  declare expiration_date: Date;
  declare client_id: number;
}

export const initBillingDetailsModel = async (sequelize: Sequelize) => {
  BillingDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      billing_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      card_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      tableName: "billing_details",
      sequelize, // Instance of sequelize that reflects the connection
    }
  );

  await BillingDetails.sync();
};

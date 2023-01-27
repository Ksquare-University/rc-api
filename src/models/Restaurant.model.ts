import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class Restaurant extends Model<
  InferAttributes<Restaurant>,
  InferCreationAttributes<Restaurant>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare city_id: number;
  declare category: string;
  declare delivery_fee: CreationOptional<number>;
  declare phone_number: number;
  declare owner_id: number;
  declare is_deleted: CreationOptional<boolean>;
  static owner_id: any;
}

export const initRestaurantModel = async (sequelize: Sequelize) => {
  Restaurant.init(
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
      description: DataTypes.STRING,
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      delivery_fee: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      phone_number: DataTypes.INTEGER,
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "restaurant",
      sequelize, // Instance of sequelize that reflects the connection
    }
  );

  await Restaurant.sync();
};

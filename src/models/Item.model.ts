import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';

export class Item extends Model<
  InferAttributes<Item>,
  InferCreationAttributes<Item>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare is_deleted: CreationOptional<boolean>;
}

export const initItemModel = async (sequelize: Sequelize) => {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );

  await Item.sync();
};

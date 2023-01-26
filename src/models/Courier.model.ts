import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';

export class Courier extends Model<
  InferAttributes<Courier>,
  InferCreationAttributes<Courier>
> {
  declare id: CreationOptional<number>;
  declare full_name: string;
  declare phone_number: number;
  declare user_id: string;
}

export const initCourierModel = async (sequelize: Sequelize) => {
  Courier.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'courier',
      sequelize,
    }
  );

  await Courier.sync();
};

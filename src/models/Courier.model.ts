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
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );

  await Courier.sync();
};

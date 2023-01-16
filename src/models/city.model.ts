import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class City extends Model<
  InferAttributes<City>,
  InferCreationAttributes<City>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare is_active: CreationOptional<boolean>;
}

export const initCity = (sequelize: Sequelize) => {
  City.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "city",
      sequelize,
    }
  );
};

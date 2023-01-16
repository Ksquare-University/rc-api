import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: CreationOptional<number>;
  declare role: string;
}

export const initRoleModel = async (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "role",
      sequelize, // Instance of sequelize that reflects the connection
    }
  );

  await Role.sync();
};

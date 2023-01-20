import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export type Role = "customer" | "owner" | "admin" | "superadmin" | "manager";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: string;
  declare role: CreationOptional<Role>;
  declare user_name: string;
  declare email: string;
  declare password: string;
  declare is_deleted: CreationOptional<boolean>;
}

export const initUserModel = async (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "customer",
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "user",
      sequelize,
    }
  );
  await User.sync();
};

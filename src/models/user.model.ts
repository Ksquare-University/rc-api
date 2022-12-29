import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export type Role = "client" | "manager" | "admin" | "superadmin";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare role: CreationOptional<Role>;
    declare email: string;
    declare password: string;
    declare is_deleted: CreationOptional<boolean>;
}

export const initUserModel = (sequelize: Sequelize) => {
    User.init({
    
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING,
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
        }
}, { 
    sequelize
})
}

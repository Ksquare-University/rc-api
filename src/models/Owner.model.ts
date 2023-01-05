import {
    DataTypes,
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Sequelize
} from "sequelize";

export class Owner extends Model<InferAttributes<Owner>, InferCreationAttributes<Owner>> {
    declare id: CreationOptional<number>;
    declare full_name: string;
    declare phone: number;
    declare user_id: string;
    declare is_deleted: CreationOptional<boolean>;
}
export const initOwnerModel = async (sequelize: Sequelize) => {
    Owner.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        },
        {
            tableName: "owner",
            sequelize: sequelize,
        }
    );
    await Owner.sync();
};
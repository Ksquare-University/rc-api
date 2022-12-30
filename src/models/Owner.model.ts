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
    declare user_id: number;
    declare is_Deleted: CreationOptional<boolean>;
}
export const initAdminsModel = async (sequelize: Sequelize) => {
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
                type: DataTypes.INTEGER,
                allowNull: false
            },
            is_Deleted: {
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
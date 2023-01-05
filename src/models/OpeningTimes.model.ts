import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class OpeningTimes extends Model<InferAttributes<OpeningTimes>, InferCreationAttributes<OpeningTimes>> {

    declare id: CreationOptional<number>;
    declare restaurant_id : number;
    declare is_deleted: CreationOptional<boolean>;
}

export const initOpeningTimesModel = async (sequelize: Sequelize) => {
    OpeningTimes.init({

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        restaurant_id :{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },

}, {
    tableName: 'opening_times',
    sequelize // Instance of sequelize that reflects the connection
})

await OpeningTimes.sync();

}
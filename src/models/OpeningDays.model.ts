import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize, DateDataType, AbstractDataType } from "sequelize";


export class OpeningDays extends Model<InferAttributes<OpeningDays>, InferCreationAttributes<OpeningDays>> {

    declare id: CreationOptional<number>;
    declare restaurant_id : number;
    declare day:string;
    declare opening_hour: AbstractDataType | string;
    declare closing_hour: AbstractDataType | string;
    declare is_deleted: CreationOptional<boolean>;
}

export const initOpeningDaysModel = async (sequelize: Sequelize) => {
    OpeningDays.init({

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        restaurant_id :{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        day: {
            type: DataTypes.STRING,
            defaultValue: false,
          },
        opening_hour: {
          type: DataTypes.TIME,
          defaultValue: '9:00',
        },
        closing_hour: {
          type: DataTypes.TIME,
          defaultValue: '21:00',
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
}, 

{
    tableName:'opening_days',
    sequelize // Instance of sequelize that reflects the connection
})

await OpeningDays.sync();

}
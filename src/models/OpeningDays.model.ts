import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class OpeningDays extends Model<InferAttributes<OpeningDays>, InferCreationAttributes<OpeningDays>> {

    declare id: CreationOptional<number>;
    declare restaurant_id : number;
    declare day:string;
    declare opening_hour:number;
    declare closing_hour:number;
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
          defaultValue: false,
        },
        closing_hour: {
          type: DataTypes.TIME,
          defaultValue: false,
        },

}, 

{
    tableName:'opening_days',
    sequelize // Instance of sequelize that reflects the connection
})

await OpeningDays.sync();

}
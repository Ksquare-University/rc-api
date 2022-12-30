import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class OpeningDays extends Model<InferAttributes<OpeningDays>, InferCreationAttributes<OpeningDays>> {

    declare id: number;
    declare restaurant_id : number;
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
            autoIncrement: true,
            primaryKey: true
        }

}, {
    sequelize // Instance of sequelize that reflects the connection
})

await OpeningDays.sync();

}
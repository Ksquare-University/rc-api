import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";


export class OpeningTimes extends Model<InferAttributes<OpeningTimes>, InferCreationAttributes<OpeningTimes>> {

    declare id: number;
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
            autoIncrement: true,
        },
}, {
    sequelize // Instance of sequelize that reflects the connection
})

await OpeningTimes.sync();

}
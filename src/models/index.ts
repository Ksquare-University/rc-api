import { Sequelize } from "sequelize";
import { initOpeningTimesModel } from "./OpeningTimes.model";
export let sequelize: Sequelize;

const models = [initOpeningTimesModel];

import { Sequelize } from "sequelize
import { initClientModel } from "./Customer.model";
import { initSaleModel } from "./Sale.model";
import { initUserModel } from "./user.model";
import { initCity } from "./city.model";

export let sequelize: Sequelize;
const models = [initCity, initUserModel, initClientModel, initSaleModel];

export const startSequelize = (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    })

    //This is commented for the moment when the models has been created
    for(const initModel of models) {
        initModel(sequelize);
    }

    return sequelize;

import { Sequelize } from "sequelize";
import { initClientModel } from "./Customer.model";
import { initSaleModel } from "./Sale.model";

export let sequelize: Sequelize;

const models = [ initClientModel, initSaleModel ];
export const startSequelize = (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    })

    //This is commented for the moment when the models has been created
   /*  for(const initModel of models) {
        initModel(sequelize);
    }
 */
    return sequelize;
}


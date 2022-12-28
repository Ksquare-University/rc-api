import { Sequelize } from "sequelize";
import { initRoleModel } from "../Role.model";
import { initRestaurantModel } from "../Restaurant.model";

export let sequelize: Sequelize;

const models = [initRoleModel,initRestaurantModel];
export const startSequelize = async (db_name: string, db_password: string, db_hostname: string, db_username: string) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    })

    for(const initModel of models) {
        initModel(sequelize);
    }
 
    //await sequelize.sync({force:true});


    //setupAssocations();
    return sequelize;
}


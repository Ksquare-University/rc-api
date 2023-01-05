import { Sequelize } from 'sequelize';
import { initClientModel } from './Customer.model';
import { initSaleModel } from './Sale.model';
import { initUserModel } from './user.model';
import { initCity } from './city.model';
import { initClientAddressModel } from './ClientAddress.model';
import { initRestaurantModel } from './Restaurant.model';
import { initBillingDetailsModel } from './BillingDetails.model';
import { initItemModel } from './Item.model';
import { initPaymentMethodModel } from './PaymentMethod.model';
import { initOrderModel } from './Order.model';
import { initOpeningDaysModel } from "./OpeningDays.model";

export let sequelize: Sequelize;
const models = [
  initCity,
  initUserModel,
  initClientModel,
  initSaleModel,
  initClientAddressModel,
  initRestaurantModel,
  initBillingDetailsModel,
  initItemModel,
  initPaymentMethodModel,
  initOrderModel,
  initOpeningDaysModel,
];

export const startSequelize = (
  db_name: string,
  db_password: string,
  db_hostname: string,
  db_username: string
) => {
  sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: 'postgres',
    host: db_hostname,
  });

  //This is commented for the moment when the models has been created
  for (const initModel of models) {
    initModel(sequelize);
  }
  return sequelize;
};

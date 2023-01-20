import { Sequelize } from 'sequelize';
import { initCustomerModel } from '../Customer.model';
import { initSaleModel } from '../Sale.model';
import { initUserModel } from '../user.model';
import { initCity } from '../city.model';
import { initClientAddressModel } from '../ClientAddress.model';
import { initRestaurantModel } from '../Restaurant.model';
import { initBillingDetailsModel } from '../BillingDetails.model';
import { initItemModel } from '../Item.model';
import { initPaymentMethodModel } from '../PaymentMethod.model';
import { initOrderModel } from '../Order.model';
import { initOpeningDaysModel } from "../OpeningDays.model";
import { initCourierModel } from '../Courier.model';
import { initOrderItemsModel } from "../OrderItems.model";
import { initRoleModel } from "../Role.model";
import { initOwnerModel } from "../Owner.model";
import { initManager } from '../Manager.Model';
import { initOrderStatus } from '../OrderStatus.Model';

export let sequelize: Sequelize;
const models = [
    initCity,
    initRoleModel,
    initUserModel,
    initOwnerModel,
    initCustomerModel,
    initCourierModel,
    initRestaurantModel,
    initManager,
    initOpeningDaysModel,
    initItemModel,
    initOrderStatus,
    initOrderModel,
    initOrderItemsModel,
    initClientAddressModel,
    initBillingDetailsModel,
    initPaymentMethodModel,
    initSaleModel
];

export const startSequelize = (
    db_name: string,
    db_password: string,
    db_hostname: string,
    db_username: string,
    db_port: number
) => {
    sequelize = new Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
        port: db_port
    });

  for (const initModel of models) {
    initModel(sequelize);
  }
  
  return sequelize;
};

import { Client } from '../Customer.model';
import { Sale } from '../Sale.model';
import { User } from '../user.model';
import { City } from '../city.model';
import { ClientAddress } from '../ClientAddress.model';
import { Restaurant } from '../Restaurant.model';
import { BillingDetails } from '../BillingDetails.model';
import { Item } from '../Item.model';
import { PaymentMethod } from '../PaymentMethod.model';
import { Order } from '../Order.model';
import { OpeningDays } from "../OpeningDays.model";
import { Courier } from '../Courier.model';
import { OrderItems } from "../OrderItems.model";
import { Role } from "../Role.model";
import { Owner } from "../Owner.model";
import { Manager } from '../Manager.Model';
import { OrderStatus } from '../OrderStatus.Model';

//Associations:
/* USER:
Ref: User.role - role.id // one-to-one
Ref: User.id - owner.user_id // one-to-one
Ref: User.id - client.user_id // one-to-one
Ref: User.id - Courier.user_id // one-to-one
*/
/*
//OWNER:
Ref: owner.id < restaurant.owner_id // one-to-many
//restaurant
Ref: restaurant.id - Manager.restaurant_id // one-to-one
Ref: restaurant.id < OpeningDays.restaurant_id // one-to-many

//Manager:
Ref: client.id - Manager.client_id // one-to-one
//Client
Ref: client.id < Order.client_id // one-to-many
Ref: client.id - Client_Address.client_id // one-to-one
Ref: client.id - Billing_Details.client_id //one-to-one
//Billing_Details
Ref: Billing_Details.id - Payment_Method.Billing_Details_id
//Payment_Method
Ref: Payment_Method.id - Sale.payment_id // one-to-one
//Order
Ref: Order.id - Sale.order_id // one-to-one
Ref: Order.courier_id - Courier.id // one-to-one
Ref: Order.order_status_id - Order_Status.id // one-to-one
Ref: Order.id < Order_items.order_id // one-to-many
Ref: Order.restaurant_id > restaurant.id // many-to-one
//Order_items
Ref: Order_items.item_id - Item.id // one-to-one
//City
Ref: city.id - restaurant.city_id
Ref: city.id - Client_Address.city_id
Ref: city.id - Sale.city_id
*/

//------------------------ U S E R --------------------------------

// User.belongsTo(Role, {
//     foreignKey: 'role_id',
// });

User.hasOne(Owner, {
    foreignKey: 'user_id',
});

User.hasOne(Client, {
    foreignKey: 'user_id',
});

User.hasOne(Courier, {
    foreignKey: 'user_id',
});

//------------------------ O W N E R --------------------------------

Owner.hasMany(Restaurant, {
    foreignKey: 'owner_id',
});

//------------------------ R E S T A U R A N T S -------------------------------

Restaurant.hasOne(Manager, {
    foreignKey:'restaurant_id',
});

Restaurant.hasMany(OpeningDays, {
    foreignKey:'restaurant_id',
});

//------------------------ M A N A G E R --------------------------------

Manager.belongsTo(User, {
    foreignKey:'user_id', 
});


//------------------------ C L I E N T --------------------------------

Client.hasMany(Order, {
    foreignKey:'client_id',
});

Client.hasOne(ClientAddress, {
    foreignKey:'client_id',
});

Client.hasOne(BillingDetails, {
    foreignKey:'client_id',
});

//------------------------ BILLING DETAILS --------------------------------

BillingDetails.belongsTo(PaymentMethod, {
    foreignKey:'payment_id',
});

//------------------------ PAYMENT METHODS --------------------------------

PaymentMethod.belongsTo(Sale, {
    foreignKey:'order_status_id',
});

//------------------------ O R D E R --------------------------------

Order.hasOne(Sale, {
    foreignKey:'order_id',
});

Order.belongsTo(Courier, {
    foreignKey:'courier_id',
});

Order.belongsTo(OrderStatus, {
    foreignKey:'order_status_id',
});

Order.hasMany(OrderItems, {
    foreignKey:'order_id',
});

Order.belongsTo(Restaurant, {
    foreignKey:'restaurant_id',
});

//------------------------ ORDER ITEM --------------------------------

OrderItems.belongsTo(Item, {
    foreignKey:'item_id',
});

//------------------------ I T E M --------------------------------

Item.belongsTo(Restaurant, {
    foreignKey:'restaurant_id',
});

//------------------------ C I T Y --------------------------------

City.hasOne(Restaurant, {
    foreignKey:'city_id',
});

City.hasOne(ClientAddress, {
    foreignKey:'city_id',
});

City.hasOne(Sale, {
    foreignKey:'city_id',
});


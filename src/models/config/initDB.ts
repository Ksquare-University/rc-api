import { Customer } from '../Customer.model';
import { Sale } from '../Sale.model';
import { User, Role as Roletype } from '../user.model';
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
import { OrderStatus } from '../OrderStatus.Model';
import { Manager } from '../Manager.Model';
import { AbstractDataType } from 'sequelize';

export const initDb = () =>{

    //Functions to create
    const createCity = (name:string) =>{City.create({name})}
    const createRole = (role:string) => {Role.create({role})}

    const createUser = (id:string, role:Roletype, user_name:string, email:string, password:string) =>{User.create({id, role, user_name, email, password})}
    const createOwner = (full_name: string, phone: number, user_id: string) =>{Owner.create({full_name, phone, user_id})}
    const createManager = (user_id:string, restaurant_id:number) => {Manager.create({user_id, restaurant_id})}
    const createClient = (full_name: string, phone_number: number, user_id: string) =>{Customer.create({full_name, phone_number, user_id})}
    const createCourier = (user_id: string) =>{Courier.create({user_id})}

    const createRestaurant = (name:string, description:string, city_id:number, category:string, delivery_fee:number, phone_number:number, owner_id:number) => {Restaurant.create({name, description, city_id, category, delivery_fee, phone_number, owner_id})}
    const createOpening = (restaurant_id:number, day:string, opening_hour:AbstractDataType, closing_hour:AbstractDataType) => {OpeningDays.create({restaurant_id, day, opening_hour, closing_hour})}
    const createItems = (name:string, price:number, restaurant_id:number) => {Item.create({name, price, restaurant_id})}
    const createOrderItems = (order_id:number, item_id:number, quantity:number) => {OrderItems.create({order_id, item_id, quantity})}

    const createOrderStatus = (name:string) => {OrderStatus.create({name})}
    const createOrder = (client_id:number, courier_id:number, restaurant_id:number) =>{Order.create({client_id, courier_id, restaurant_id})}
    
    const createClientAddress = (client_id:number, address:string, reference:string, zip_code:number, city_id:number) =>{ClientAddress.create({client_id, address, reference, zip_code, city_id})}
    const createBillingDetails = (owner_name:string, billing_address:string, card_number:number, cvv:number, expiration_date:Date, client_id:number) =>{BillingDetails.create({owner_name, billing_address, card_number, cvv, expiration_date, client_id})}
    const createPaymentMethod = (method:string, billing_details_id:number) => {PaymentMethod.create({method, billing_details_id})}
    
    const createSale = (order_id:number, total_price:number, total_items:number, date:Date, payment_id:number, address:string, city_id:number, refrences:string) =>{Sale.create({order_id, total_price, total_items, date, payment_id, address, city_id, refrences})}


    //Here I wil Create the initial data for my DB
    
    createCity('Merida');

    createRole('customer');
    createRole('owner');
    createRole('admin');
    createRole('superadmin');

    //I take the data from 
    const password = 'root123'
    createUser('SVPKICCqw4gQunZkh9RGQYlYqTa2', 'owner', 'JonnyBravo', 'jonathan@owner.com', password);
    createUser('aIQE89C99GS12rQOCavulY8RIsv1', 'owner', 'QueenOfPix', 'ivanna@owner.com', password);
    createUser('FzWNfHrPaLYbf69ETp5gQY6Qdzb2', 'owner', 'HoidOnBush', 'gabriel@owner.com', password);

    createUser('hnDnZBjKaJYxFT6hNQwQc43kmxr2', 'admin', 'Mariana123', 'mariana@admin.com', password);
    createUser('SXTSeuVibpRs3wZEfPKnxZT4U1D2', 'admin', 'Yumil22222', 'yumil@admin.com', password);
    createUser('NzIlqZzUQWQD8vQhSlOS7gwSHxs2', 'admin', 'Argenis123', 'argenis@admin.com', password);
    
    createUser('AIPCkVBKTZdGBIhiIrlJTGXnpim1', 'superadmin', 'Superadmin', 'rappi@superadmin.com', password);
    
    createUser('DXCISM9Dqbcr814VjXynl6w7CYC3', 'customer', 'Palomitas', 'brandon@customer.com', password);
    createUser('lHhRx3Pw4Seu5cExtWnldaSjRhM2', 'customer', 'Genaro123', 'genaro@customer.com', password);
    createUser('RoPXOPVJnoZcdYbdHpjDBmq31ym2', 'customer', 'Rodrigo12', 'rodrigo@customer.com', password);
    createUser('2sPhEfPCyDPLIChpQPfbeFgf6s32', 'customer', 'IamDannae', 'dannae@customer.com', password);

    //

    




    
 
}
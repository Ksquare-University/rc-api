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

export const initDb = () =>{

    //Functions to create
    const createCity = (name:string) =>{City.create({name})}
    const createRole = (role:string) => {Role.create({role})}

    const createUser = (id:string, role:Roletype, user_name:string, email:string, password:string) =>{User.create({id, role, user_name, email, password})}
    const createOwner = (full_name: string, phone: number, user_id: string) =>{Owner.create({full_name, phone, user_id})}
    const createClient = (full_name: string, phone_number: number, user_id: string) =>{Customer.create({full_name, phone_number, user_id})}
    const createCourier = (user_id: string) =>{Courier.create({user_id})}
    type hour = string;
    const createRestaurant = (name:string, description:string, city_id:number, category:string, delivery_fee:number, phone_number:number, owner_id:number) => {Restaurant.create({name, description, city_id, category, delivery_fee, phone_number, owner_id})}
    const createManager = (user_id:string, restaurant_id:number) => {Manager.create({user_id, restaurant_id})}
    const createOpening = (restaurant_id:number, day:string, opening_hour:string, closing_hour:string) => {OpeningDays.create({restaurant_id, day, opening_hour, closing_hour})}
    const createItems = (name:string, price:number, restaurant_id:number) => {Item.create({name, price, restaurant_id})}

    const createOrderStatus = (name:string) => {OrderStatus.create({name})}
    const createOrder = (client_id:number, courier_id:number, restaurant_id:number) =>{Order.create({client_id, courier_id, restaurant_id})}
    const createOrderItems = (order_id:number, item_id:number, quantity:number) => {OrderItems.create({order_id, item_id, quantity})}
    
    const createClientAddress = (client_id:number, address:string, reference:string, zip_code:number, city_id:number) =>{ClientAddress.create({client_id, address, reference, zip_code, city_id})}
    const createBillingDetails = (owner_name:string, billing_address:string, card_number:string, cvv:number, expiration_date:Date, client_id:number) =>{BillingDetails.create({owner_name, billing_address, card_number, cvv, expiration_date, client_id})}
    const createPaymentMethod = (method:string, billing_details_id:number) => {PaymentMethod.create({method, billing_details_id})}
    
    const createSale = (order_id:number, total_price:number, total_items:number, date:Date, payment_id:number, address:string, city_id:number, refrences:string) =>{Sale.create({order_id, total_price, total_items, date, payment_id, address, city_id, refrences})}


    //Here I wil Create the initial data for my DB
    
    createCity('Merida');

    createRole('customer');
    createRole('owner');
    createRole('admin');
    createRole('superadmin');

    //I take the data from || "customer" | "owner" | "admin" | "superadmin" | "manager";
    const passwordSuperAdmin = 'root123';
    const password = 'test123';
    createUser('SVPKICCqw4gQunZkh9RGQYlYqTa2', 'owner', 'JonnyBravo', 'jonathan@owner.com', password);
    createUser('aIQE89C99GS12rQOCavulY8RIsv1', 'owner', 'QueenOfPix', 'ivanna@owner.com', password);
    createUser('FzWNfHrPaLYbf69ETp5gQY6Qdzb2', 'owner', 'HoidOnBush', 'gabriel@owner.com', password);

    createUser('hnDnZBjKaJYxFT6hNQwQc43kmxr2', 'admin', 'Mariana123', 'mariana@admin.com', password);
    createUser('SXTSeuVibpRs3wZEfPKnxZT4U1D2', 'admin', 'Yumil22222', 'yumil@admin.com', password);
    createUser('NzIlqZzUQWQD8vQhSlOS7gwSHxs2', 'admin', 'Argenis123', 'argenis@admin.com', password);
    
    createUser('AIPCkVBKTZdGBIhiIrlJTGXnpim1', 'superadmin', 'Superadmin', 'rappi@superadmin.com', passwordSuperAdmin);
    
    createUser('DXCISM9Dqbcr814VjXynl6w7CYC3', 'customer', 'Palomitas', 'brandon@customer.com', password);
    createUser('lHhRx3Pw4Seu5cExtWnldaSjRhM2', 'customer', 'Genaro123', 'genaro@customer.com', password);
    createUser('RoPXOPVJnoZcdYbdHpjDBmq31ym2', 'customer', 'Rodrigo12', 'rodrigo@customer.com', password);
    createUser('2sPhEfPCyDPLIChpQPfbeFgf6s32', 'customer', 'IamDannae', 'dannae@customer.com', password);
    //courier
    createUser('CQKoMpHPQDRXyI53gkv2pM7FAQW2', 'customer', 'TheCourier', 'courier@courier.com', password);


    createUser('07rkUeK3ECgKQgG8PxRBvE6ZYBz2', 'manager', 'JonnyManager', 'waykiki@manager.com', password);
    createUser('IepgRjBfpAUutSzJWGNYQSCgsGH2', 'manager', 'IvannaManager', 'ivanna@manager.com', password);
    createUser('5lb0Y89fkrY9NbEfylNhRWHw53D2', 'manager', 'GaboManager', 'gabriel@manager.com', password);
    createUser('1AdDYHaUXGPU4BZCsvUvLj7AHJZ2', 'manager', 'Manager1', 'mana1@manager.com', password);
    createUser('rMPKhFJRc2PEes6xVZBFA0i32oG3', 'manager', 'Manager2', 'mana2@manager.com', password);
    createUser('7gZMUfVKHxX3dfgAPn0gQVCgSPf2', 'manager', 'Manita', 'manita@manager.com', password);


    //------------------------
    createClient('Brandon Hernandez', 1546855251, 'DXCISM9Dqbcr814VjXynl6w7CYC3');
    createClient('Genaro Hernandez', 1546855251, 'lHhRx3Pw4Seu5cExtWnldaSjRhM2');
    createClient('Rodrigo Hernandez', 1546855251, 'RoPXOPVJnoZcdYbdHpjDBmq31ym2');
    createClient('Dannae Diaz', 1546855251, '2sPhEfPCyDPLIChpQPfbeFgf6s32');

    createCourier('CQKoMpHPQDRXyI53gkv2pM7FAQW2');

    createOwner('Dom Dimadom', 1548258478, 'SVPKICCqw4gQunZkh9RGQYlYqTa2');
        createRestaurant('Estadio Dimadon', 'Hamburgers, tacos and more', 1, 'Fast food', 0, 9898202, 1);
        createRestaurant('Dimmsdale', 'Magic food', 1, 'Fast food', 0, 9898202, 1);

    
    createOwner('Elon Musk', 1548258478, 'aIQE89C99GS12rQOCavulY8RIsv1');
        createRestaurant('Space X', 'Spacial food ', 1, 'Fast food', 0, 9898202, 2);
        createRestaurant('Kung Pau', 'Food with an asiatic style', 1, 'Suhsi', 0, 9898202, 2);

    createOwner('Vila', 1548258478, 'FzWNfHrPaLYbf69ETp5gQY6Qdzb2');
        createRestaurant('SUBWAY', 'Best sandwichs of the world', 1, 'Traditional food', 0, 9898202, 3);
        createRestaurant('De gusto al Carbon', 'Best sandwichs of the world', 1, 'Traditional food', 0, 9898202, 3);

    //Manager
    createManager('07rkUeK3ECgKQgG8PxRBvE6ZYBz2', 1);
    createManager('IepgRjBfpAUutSzJWGNYQSCgsGH2', 2);
    createManager('5lb0Y89fkrY9NbEfylNhRWHw53D2', 3);
    createManager('1AdDYHaUXGPU4BZCsvUvLj7AHJZ2', 4);
    createManager('rMPKhFJRc2PEes6xVZBFA0i32oG3', 5);
    createManager('7gZMUfVKHxX3dfgAPn0gQVCgSPf2', 6);
    

    // createOpening(1, 'Monday',"10:00","20:00");
    // OpeningDays.create({restaurant_id:1, day:'Monday', opening_hour:'10:00', closing_hour:'20:00', is_deleted: false});


    //Open/close hours ->Schedule?
    for(let i = 1; i<=3 ; i++){
        createOpening(i, 'Monday', `0${i+6}:00`,'18:00');
        createOpening(i, 'Tuesday', `0${i+6}:00`,'18:00');
        createOpening(i, 'Wednesday', `0${i+6}:00`,'18:00');
        createOpening(i, 'Thursday', `0${i+6}:00`,'18:00');
        createOpening(i, 'Friday', `0${i+6}:00`,'18:00');
        createOpening(i, 'Saturday', `0${i+6}:00`,'18:00');
        createOpening(i, 'Sunday', `0${i+6}:00`,'18:00');

    }   
    for(let i = 4; i<=6 ; i++){
        createOpening(i, 'Monday', '8:00',`${18-i}:00`);
        createOpening(i, 'Tuesday', '8:00',`${18-i}:00`);
        createOpening(i, 'Wednesday', '8:00',`${18-i}:00`);
        createOpening(i, 'Thursday', '8:00',`${18-i}:00`);
        createOpening(i, 'Friday', '8:00',`${18-i}:00`);
        createOpening(i, 'Saturday', '8:00',`${18-i}:00`);
        createOpening(i, 'Sunday', '8:00',`${18-i}:00`);
    }

    //Estadio Dimadon
    createItems('Hamburger', 135, 1);
    createItems('Tacos', 15, 1);
    createItems('Burrito', 100, 1);
    //Dimmsdale
    createItems('The Fairly OddParents', 135, 2);
    createItems('Magic wand', 15, 2);
    createItems('Dragon', 100, 2);
    
    //Space X
    createItems('Spaceship', 135, 3);
    createItems('Space cake', 15, 3);
    createItems('Discussion on twitter', 100, 3);
    //KungPau
    createItems('Basic sushi', 135, 4);
    createItems('Roast bacon', 15, 4);
    createItems('Sushi Dragon', 100, 4);
    //SUBWAY
    createItems('Vegetarian', 65, 5);
    createItems('Clasic', 25, 5);
    createItems('Bacon', 80, 5);
    //De gusto al Carbon
    createItems('The Fairly OddParents', 135, 6);
    createItems('Magic wand', 15, 6);
    createItems('Dragon', 100, 6);

    createOrderStatus('Waiting confimation');
    createOrderStatus('Acepted');
    createOrderStatus('Cooking');
    createOrderStatus('Done');
    createOrderStatus('On route');

    createOrder(1, 1, 1);
    createOrder(2, 1, 1);

    createOrderItems(1, 1, 3);
    createOrderItems(1, 2, 3);

    createOrderItems(2, 5, 2);
    createOrderItems(2, 6, 1);



    //Client stufs
    createClientAddress(1, 'Street 12 in Malaga', 'White house', 97206, 1);
    createClientAddress(2, 'Street 31-1 No 333 38b and 30b', 'Green house with and tree in the door', 97206, 1);
    createClientAddress(3, 'Street 43 Chuburna-In', 'In fron of Inbursa bank', 97206, 1);
    createClientAddress(4, 'Street Chimpansingo', '10 dogs in the house', 97206, 1);

    createBillingDetails('Brandon Rodrigez', 'Street 12 in Malaga', '1234456778911234',123, new Date(2025, 5), 1);
    createBillingDetails('Brandon Rodrigez', 'Street 12 in Malaga', '7894456112307894',123, new Date(2025, 5), 1);

    createBillingDetails('Genaro Luna', 'Street 12 in Malaga', '1234456778911234',123,new Date(2025, 5), 2);

    createBillingDetails('Rodrigo Hernandez', 'Street 12 in Malaga', '1234456778911234',123,new Date(2025, 5), 3);
    createBillingDetails('Rodrigo Hernandez', 'Street 12 in Malaga', '1234456778911234',123,new Date(2025, 5), 3);

    createBillingDetails('Dannae Diaz', 'Street 12 in Malaga', '1234456778911234', 123,new Date(2025, 5), 4);

    createPaymentMethod('Credit card BBVA', 1);
    createPaymentMethod('Debid card Inbursa', 2);

    createPaymentMethod('Genaro tarjeta', 3);

    createPaymentMethod('Tarjeta papa', 4);
    createPaymentMethod('Rodrigo BBVA', 5);

    createPaymentMethod('BNP card', 6);

    createSale(1, 300, 6, new Date(), 1,'Street 12 in Malaga', 1, 'White house');
    createSale(2, 130, 3, new Date(), 2,'Street 12 in Malaga', 1, 'White house');
}
import { Router } from 'express';
import controllers from '../controllers/index';

const routerCustomer = Router();

const controller = controllers.customercontroller;

routerCustomer.get('/:id', controller.getCustomerById);
routerCustomer.get('/uid/:id', controller.getCustomerByUId);



export default routerCustomer;
import { Router } from 'express';
import controllers from '../controllers/index';

const routerItems = Router();

const controller = controllers.itemcontroller;

routerItems.get('/:id', controller.getItemById);
routerItems.get('/all/:id', controller.getItemsbyRestaurantId);
routerItems.post('/new', controller.createItem);




export default routerItems;
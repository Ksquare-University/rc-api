import { Router } from 'express';
import controllers from '../controllers';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const orderRoutes = Router();

const { orderController } = controllers;

orderRoutes.post('/', isAuthenticated, orderController.createOrder);
orderRoutes.get(
  '/byRestaurant/:restaurantId',
  isAuthenticated,
  orderController.getOrdersByRestaurantId
);

export default orderRoutes;

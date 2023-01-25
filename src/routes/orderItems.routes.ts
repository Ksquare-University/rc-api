import { Router } from "express";
import controllers from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const orderItemsRoutes = Router();
const { orderItemsController } = controllers;

orderItemsRoutes.get('/:orderId', orderItemsController.getOrderItemsByOrderId);
orderItemsRoutes.post('/:orderId', orderItemsController.addItemsToOrder);
orderItemsRoutes.put('/:orderId', orderItemsController.updateItemquantity);
orderItemsRoutes.delete('/:orderId', orderItemsController.deleteItem);

export default orderItemsRoutes;
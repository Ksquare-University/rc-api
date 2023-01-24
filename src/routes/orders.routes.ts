import { Router } from "express";
import controllers from "../controllers/index";

const OrderRoutes = Router();
const controller = controllers.OrdersController;



/*TODO: MIDDLEWARES*/
OrderRoutes.get("/", controller.getOrders);





/* OrderRouter.post("/new", controller.createRestaurant);
OrderRouter.delete("/:id", controller.deleteRestaurantById);
OrderRouter.put("/:id", controller.updateRestaurantById); */

export default OrderRoutes;

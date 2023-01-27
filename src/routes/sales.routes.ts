import { Router } from "express";
import controllers from "../controllers/index";

const SalesRoutes = Router();
const controller = controllers.SalesController;



/*TODO: MIDDLEWARES*/
SalesRoutes.get("/", controller.getSalesAll);
SalesRoutes.get("/owner/:uid", controller.getSales);






/* OrderRouter.post("/new", controller.createRestaurant);
OrderRouter.delete("/:id", controller.deleteRestaurantById);
OrderRouter.put("/:id", controller.updateRestaurantById); */

export default SalesRoutes;

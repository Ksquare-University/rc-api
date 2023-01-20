import { Router } from "express";
import controllers from "../controllers/index";

const restaurantRouter = Router();
const controller = controllers.restaurantcontroller;
/*TODO: MIDDLEWARES*/
restaurantRouter.get("/:id", controller.getRestaurantById);
restaurantRouter.get("/all/:ownerId", controller.getAllRestaurantsbyOwnerId);
restaurantRouter.post("/new", controller.createRestaurant);
restaurantRouter.delete("/:id", controller.deleteRestaurantById);
restaurantRouter.put("/:id", controller.updateRestaurantById);

export default restaurantRouter;

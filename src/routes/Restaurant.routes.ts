import {Router} from "express";
import controllers from "../controllers/index";

const router = Router();
const controller = controllers.restaurantcontrollers;
/*TODO: MIDDLEWARES*/
router.get("/:id",controller.getRestaurantById);
router.get("/:ownerId",controller.getAllRestaurantsbyOwnerId);
router.post("/new",controller.createRestaurant);
router.delete("/:id",controller.deleteRestaurantById);
router.post("/:id",controller.deleteRestaurantById);
router.post("/:id",controller.updateRestaurantById);


export default router;
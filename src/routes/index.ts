import { Router } from "express";
import cityRoutes from "./city.routes";
import managerRoutes from "./manager.routes";
import restaurantRoutes from "./Restaurant.routes";

const router = Router();

router.use('/city', cityRoutes);
router.use('/manager', managerRoutes);
router.use('/restaurant', restaurantRoutes);


export default router;
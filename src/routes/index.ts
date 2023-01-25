import { Router } from "express";
import cityRoutes from "./city.routes";
import managerRoutes from "./manager.routes";
import restaurantRoutes from "./restaurants.routes";
import scheduleRouter from "./Schedules.routes";

const router = Router();

router.use('/city', cityRoutes);
router.use('/manager', managerRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/schedule', scheduleRouter);


export default router;
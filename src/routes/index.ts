import { Router } from "express";
import cityRoutes from "./city.routes";
import managerRoutes from "./manager.routes";
import restaurantRoutes from "./Restaurant.routes";
import  OrderRoutes  from "./orders.routes";
import scheduleRouter from "./Schedules.routes";

const router = Router();

router.use('/city', cityRoutes);
router.use('/manager', managerRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/orders', OrderRoutes)
router.use('/schedule', scheduleRouter);


export default router;
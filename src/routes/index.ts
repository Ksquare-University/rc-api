import { Router } from 'express';
import cityRoutes from './city.routes';
import managerRoutes from './manager.routes';
import orderRoutes from './order.routes';
import restaurantRoutes from './restaurants.routes';
import scheduleRouter from './Schedules.routes';
import orderItemsRoutes from './orderItems.routes';

const router = Router();

router.use('/city', cityRoutes);
router.use('/manager', managerRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/schedule', scheduleRouter);
router.use('/orders', orderRoutes);
router.use('/orderitems', orderItemsRoutes);

export default router;

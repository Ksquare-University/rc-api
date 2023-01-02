import { Router } from 'express';
import restaurantRoutes from './Restaurant.routes';

const router = Router();

router.use('/restaurant', restaurantRoutes);



export default router;
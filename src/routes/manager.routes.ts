import { Router } from 'express';
import controllers from '../controllers/index';

const router = Router();

const controller = controllers.maangercontroller;

router.get('/:id', controller.getManagerById);


export default router;
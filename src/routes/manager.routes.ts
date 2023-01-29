import { Router } from 'express';
import controllers from '../controllers/index';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

const controller = controllers.maangercontroller;

router.get('/:id', controller.getManagerById);
router.get('/uid/:uid', isAuthenticated, controller.getManagerByUid);
router.get('/uid/:id', controller.getManagerByUId);


export default router;

import { Router } from 'express';
import controllers from '../controllers/index';

const routerAdmin = Router();

const controller = controllers.ownercontroller;

routerAdmin.get('/:id', controller.getAdminById);
routerAdmin.get('/uid/:id', controller.getAdminByUId);



export default routerAdmin;
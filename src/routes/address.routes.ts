import { Router } from 'express';
import controllers from '../controllers/index';

const routerAddress = Router();

const controller = controllers.addressController;

routerAddress.get('/:id', controller.getAddressByCustomerId);

export default routerAddress;
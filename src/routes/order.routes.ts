import { Router } from "express";
import controllers from "../controllers";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const orderRoutes = Router();

const { orderController } = controllers;

orderRoutes.post("/", isAuthenticated, orderController.createOrder);

export default orderRoutes;
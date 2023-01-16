import { Router } from "express";
import controllers from "../controllers/index";

const cityRoutes = Router();

const { CityController } = controllers;

cityRoutes.get("/", CityController.getCity);
cityRoutes.get("/:id", CityController.getCityById);
cityRoutes.post("/", CityController.createCity);
cityRoutes.delete("/:id", CityController.deleteCourse);

export default cityRoutes;

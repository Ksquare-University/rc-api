import {Router} from "express";
import controllers from "../controllers/index";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const scheduleRouter = Router();
const controller = controllers.schedulescontroller;
/*TODO: MIDDLEWARES*/
scheduleRouter.get("/", isAuthenticated,
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }) ,controller.getSchedules);
scheduleRouter.get("/:id",
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }), controller.getSchedulesById);
scheduleRouter.get("/restaurant/:id", controller.getSchedulesByRestaurantId);
scheduleRouter.post("/new", controller.createSchedules);
scheduleRouter.put("/:id", controller.editSchedule);

scheduleRouter.delete("/:id",
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }), controller.deleteSchedule);

export default scheduleRouter;

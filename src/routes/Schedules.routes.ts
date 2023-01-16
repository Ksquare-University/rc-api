import {Router} from "express";
import controllers from "../controllers/index";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();
const controller = controllers.schedulescontroller;
/*TODO: MIDDLEWARES*/
router.get("/", isAuthenticated,
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }) ,controller.getSchedules);
router.get("/:id",
    isAuthenticated,
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }), controller.getSchedulesById);
router.post("/new", 
    isAuthenticated,
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }),controller.createSchedules);
router.delete("/:id",
    isAuthenticated,
    isAuthenticated,
    isAuthorized({ roles: ["superadmin", "admin"], allowSameUser: true }), controller.deleteSchedule);

export default router;

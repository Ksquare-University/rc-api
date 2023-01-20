import express, { Application, Request, Response } from "express";
// Import routers
import { UserRouter } from "./routes/user.routes";
import cityRoutes from "./routes/city.routes";
import restaurantRouter from "./routes/restaurant.routes";
import schedulesRouter from './routes/Schedules.routes'
// Import cors in order to access MLHTTPRequest from Origin LocalHost:3000 (React App)
var cors = require('cors')

const app: Application = express();
app.use(express.json());
app.use(cors()) // Reference: https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked

// Connect routers
app.use("/users", UserRouter);
app.use("/city", cityRoutes);
app.use("/restaurant", restaurantRouter);

export default app;

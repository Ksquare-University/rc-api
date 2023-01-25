import express, { Application, Request, Response } from "express";
// Import routers
import { UserRouter } from "./routes/user.routes";
import cityRoutes from "./routes/city.routes";
import restaurantRouter from "./routes/restaurants.routes";
import scheduleRouter from './routes/Schedules.routes'
import orderRoutes from "./routes/order.routes";
import orderItemsRoutes from "./routes/orderItems.routes";
// Import cors in order to access MLHTTPRequest from Origin LocalHost:3000 (React App)
var cors = require('cors')

const app: Application = express();
app.use(express.json());
app.use(cors()) // Reference: https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked

// Connect routers
app.use("/users", UserRouter);
app.use("/city", cityRoutes);
app.use("/restaurant", restaurantRouter);
app.use('/schedule', scheduleRouter);
app.use('/orders', orderRoutes);
app.use('/orderitems', orderItemsRoutes);

export default app;

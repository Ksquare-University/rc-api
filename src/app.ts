import express, { Application, Request, Response } from "express";
// Import routers
import { UserRouter } from "./routes/user.routes";
import cityRoutes from "./routes/city.routes";
import restaurantRouter from "./routes/Restaurant.routes";

const app: Application = express();
app.use(express.json());

// Connect routers
app.use("/users", UserRouter);
app.use("/city", cityRoutes);
app.use("/restaurant", restaurantRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("This App is alive :D");
});

export default app;

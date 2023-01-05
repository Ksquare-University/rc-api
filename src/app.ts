import express, { Application, Request, Response } from 'express';
import cityRoutes  from "./routes/city.routes"

const app: Application = express();
app.use(express.json());

app.use('/city', cityRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('This App is alive :D');
})

export default app;

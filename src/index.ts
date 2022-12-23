import dotenv from 'dotenv';
dotenv.config();
import app from './app';


const PORT = <string>process.env.PORT;


app.listen(PORT, async () => {
    try {
        console.info('Express server is up and running!!!!')
    } catch (error) {
        console.error(error);
        process.abort();
    }
})
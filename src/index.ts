import dotenv from 'dotenv';
dotenv.config();
import { startSequelize  } from './models';
import app from './app';

const PORT = <string>process.env.PORT;
const DB = <string>process.env.DB_NAME;
const PASSWD = <string>process.env.DB_PASS;
const USER = <string>process.env.DB_USER;
const HOST = <string>process.env.localhost;


app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(DB, PASSWD, HOST, USER);
                await sequelize.sync(); 
                console.info('DB and Express server is up and running!!!!')
            } catch (error) {
                console.error(error);
                process.abort();
            }
})
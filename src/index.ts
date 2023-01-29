import dotenv from 'dotenv';
dotenv.config();
import { startSequelize } from './models/config';
import * as admin from 'firebase-admin'; // npm install firebase-admin --save
import app from './app';
import { initDb } from './models/config/initDB';
import { initAssociation } from './models/config/association';

admin.initializeApp(); // For firebase => loads credentials

const DB_PORT = <number>(<unknown>process.env.DB_PORT) ?? 5432;
const DB_NAME = <string>process.env.DB_NAME;
const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const DB_HOST = <string>process.env.localhost;
const PORT = <number>(<unknown>process.env.PORT) ?? 3000;

app.listen(PORT, async () => {
  try {
    const sequelize = await startSequelize(
      DB_NAME,
      DB_PASS,
      DB_HOST,
      DB_USER,
      DB_PORT
    );
    await sequelize.authenticate();
    initAssociation();

        await sequelize.sync({
            force: false, //In order to drop the existent data, then populate the seed data (e.g. initDb())
        }); 

        //Run it in order to populate the seed data
        //initDb();
        console.info('DB and Express server is up and running!') 
    } catch (error) {
        console.error(error);
        process.abort(); 
    }
})

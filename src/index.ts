import dotenv from "dotenv";
dotenv.config();
import { startSequelize } from "./models/config";
import * as admin from "firebase-admin"; // npm install firebase-admin --save
import app from "./app";

admin.initializeApp(); // For firebase => loads credentials

const PORT = <string>process.env.PORT;
const DB_NAME = <string>process.env.DB_NAME;
const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const DB_HOST = <string>process.env.localhost;

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(DB_NAME, DB_PASS, DB_HOST, DB_USER);
        await sequelize.sync(); 
        console.info('DB and Express server is up and running!') 
    } catch (error) {
        console.error(error);
        process.abort(); 
    }
})


import express from 'express';
import cors from "cors";
import { PORT } from './src/config/config.js';
import  { RouterUsuer } from './src/router/userRouter.js';
import { sequelize } from "./src/db/conexion.js";
// import './relations.js'
const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({
    origin:[
    'http://localhost:8100/api',
    // 'https://filmapp-c9a6b.web.app',
],
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
}));

app.use('/api', RouterUsuer);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: true })
        app.listen(_PORT,'0.0.0.0', () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();


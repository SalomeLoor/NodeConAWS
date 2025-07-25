import express from 'express';
import cors from "cors";
import { PORT } from './src/config/config.js';
import { RouterUsuer } from './src/router/userRouter.js';
import { sequelize } from "./src/db/conexion.js";

const _PORT = PORT || 3000;
const app = express();

app.use(cors({
  origin: 'http://localhost:8100',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api', RouterUsuer);

// Conexión y levantamiento del servidor
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada.');
    await sequelize.sync({ alter: true });
    app.listen(_PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto => ${_PORT}`);
    });
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

main();

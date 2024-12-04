import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js'

require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 8080;

const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('views', join(__dirname, 'views'))
app.set('view engine', ejs)
app.use(indexRoutes)

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        console.log('Mensaje recibido del cliente:', message);
        ws.send('Hola, cliente!');
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

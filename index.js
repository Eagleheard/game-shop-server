import express from 'express';
import config from 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';

import basketModule from '@models/Basket/basket.js';
import gameModule from '@models/Game/game.js';
import { database } from '@config/database.js';
import ErrorHandler from '@middleware/errorHandler.js';
import router from '@routes/index.js';

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

var whitelist = process.env.WHITELIST;
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

const io = new Server(server, {
  cors: {
    origin: corsOptions,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use(cookieParser());
app.use(ErrorHandler);

const start = async () => {
  try {
    await database.authenticate();
    await database.sync();
    io.on('connection', (socket) => {
      socket.on('game', async (id) => {
        const selectedGame = await gameModule.getById(id);
        socket.emit('selectedGame', selectedGame);
      });
      socket.on('cart', async (id) => {
        const clearedCart = await basketModule.getAll({ user: { id } });
        setTimeout(() => socket.emit('clearedCart', clearedCart), 60000);
      });
    });
    server.listen(PORT, () => console.log('Server started on', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

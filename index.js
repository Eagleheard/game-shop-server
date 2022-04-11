import express from 'express';
import config from 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';

import { database } from '@config/database.js';
import ErrorHandler from '@middleware/errorHandler.js';
import router from '@routes/index.js';
import socketConnection from '@config/socket';

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

export const io = new Server(server, {
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
    socketConnection();
    server.listen(PORT, () => console.log('Server started on', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

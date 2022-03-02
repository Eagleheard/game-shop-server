import express from 'express';
import config from 'dotenv/config';
import { database } from '@config/database.js';
import cors from 'cors';

import ErrorHandler from '@middleware/errorHandler.js';
import router from '@routes/index.js';

const PORT = process.env.PORT || 5000;
const app = express();

var whitelist = ['http://localhost:3000'];
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
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use(ErrorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

app.post('/', (req, res) => {
  res.status(200).json(req.body);
});

const start = async () => {
  try {
    await database.authenticate();
    await database.sync();
    app.listen(PORT, () => console.log('Server started on', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

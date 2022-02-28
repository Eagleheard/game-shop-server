import express from 'express';
import config from 'dotenv/config';
import { database } from './Config/database.js';
import cors from 'cors';

import ErrorHandler from './Middleware/errorHandler.js';
import router from './Routes/index.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
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

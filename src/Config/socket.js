import { Server } from 'socket.io';

import basketController from '@controllers/basket.js';
import gameModule from '@models/Game/game.js';
import { server } from '@root/index';
import { corsOptions } from '@root/index.js';

const socketConnection = () => {
  const io = new Server(server, {
    cors: {
      origin: corsOptions,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    socket.on('buyingGame', async ({ id }) => {
      const newGameInfo = await gameModule.getById(id);
      socket.emit('newGameInfo', newGameInfo);
    });
      setTimeout(() => socket.emit('clearedCart', basketController.removeAllGamesFromCart), 10000);
    });
};
export default socketConnection;

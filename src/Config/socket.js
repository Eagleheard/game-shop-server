import { Server } from 'socket.io';

import basketController from '@controllers/basket.js';
import gameModule from '@models/Game/game.js';
import commentsModule from '@models/Comments/comments.js';
import { server } from '@root/index';
import { corsOptions } from '@root/index.js';

const cleanCartTimeout = 100000;

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
      io.emit('newGameInfo', newGameInfo);
    });
    setTimeout(
      () => socket.emit('clearedCart', basketController.removeAllGamesFromCart),
      cleanCartTimeout,
    );

    socket.on('addNewComment', async (params) => {
      const gameComments = await commentsModule.getAll(params);
      io.emit('newComments', gameComments);
    });
  });
};
export default socketConnection;

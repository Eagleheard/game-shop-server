import basketController from '@controllers/basket.js';
import gameModule from '@models/Game/game.js';
import { io } from '@root/index';

const socketConnection = () =>
  io.on('connection', (socket) => {
    socket.on('buyingGame', async ({ id }) => {
      const newGameInfo = await gameModule.getById(id);
      socket.emit('newGameInfo', newGameInfo);
    });
    setTimeout(() => socket.emit('clearedCart', basketController.removeAllGamesFromCart), 10000);
  });

export default socketConnection;

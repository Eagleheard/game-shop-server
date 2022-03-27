import { Basket as basketModel } from '@models/Basket/index.js';
import { Game as gameModel } from '@models/Game/index.js';

class Basket {

  create({ game, user, count }) {
    return basketModel.create({
      gameId: game.id, 
      userId: user.id, 
      count: count,
    });
  }

  getOne({ user, game }) {
    return basketModel.findOne({
      where: {
        userId: user.id,
        gameId: game.id
      },
      include: {model: gameModel, attributes: ['id', 'name', 'count', 'price']}
    })
  }

  getAll({ user }) {
    return basketModel.findAll({
      where: {
        userId: user.id,
      },
      include: {model: gameModel, attributes: ['id', 'name', 'count', 'price']}
    })
  }

  delete({ user, game }) {
    const where = {};
    if (user) {
      where.userId = user.id;
    }
    if (game) {
      where.gameId = game.id
    }
    return basketModel.destroy( {
      where
    });
  }
}

export default new Basket();

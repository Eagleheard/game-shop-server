import { Basket as basketModel } from '@models/Basket/index.js';
import { Game as gameModel } from '@models/Game/index.js';

class Basket {
  create({ game, user }) {
    return basketModel.create({ gameId: game.id, userId: user.id });
  }

  getOne({ userId }) {
    return basketModel.findOne({
      where: {
        userId: userId,
      }
    })
  }

  getAll({ userId }) {
    return basketModel.findAll({
      where: {
        userId: userId,
      },
      include: {model: gameModel, attributes: ['id', 'name', 'count', 'price']}
    })
  }
}

export default new Basket();

import { Basket as basketModel } from '@models/Basket/index.js';
import { Game as gameModel } from '@models/Game/index.js';

class Basket {

  create({ game, user, count }) {
    return basketModel.create({gameId: game.id, userId: user.id, count: count});
  }

  increment({ count }) {
    return basketModel.increment('count', {by: count})
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

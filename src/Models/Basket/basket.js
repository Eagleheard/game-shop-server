import { Basket as basketModel } from '@models/Basket/index.js';
import { Game as gameModel } from '@models/Game/index.js';

class Basket {
  create() {
    return basketModel.create();
  }

  addGame({ game, user }) {
    return basketModel.create({gameId: game.id, userId: user.id});
  }

  getOne({ userId }) {
    return basketModel.findOne({
      where: {
        userId: userId,
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

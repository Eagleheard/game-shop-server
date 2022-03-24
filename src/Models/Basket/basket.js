import { Basket as BasketModel } from '@models/Basket/index.js';
import { Op } from 'sequelize';

import { Game as GameModel } from '@models/Game/index.js';

class Basket {
  create({ gameId, userId }) {
    return BasketModel.create( {gameId: gameId, userId: userId});
  }

  getById(basketId) {
    let basket = BasketModel.findByPk(basketId, {
      attributes: ['id'],
      include: [{ model: GameModel, attributes: ['id', 'name', 'price', 'count'] }],
    });
    return basket;
  }

  getOne({userId}) {
    return BasketModel.findOne({ 
      where: {
        userId: userId,
      }});
  }

  getAll(params) {
    return BasketModel.fildAll(params);
  }
}

export default new Basket();

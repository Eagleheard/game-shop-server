import { Basket as BasketModel } from '@models/Basket/index.js';

import { Game as GameModel } from '@models/Game/index.js';

class Basket {
  create(params) {
    return BasketModel.create(params);
  }

  getById(basketId) {
    let basket = BasketModel.findByPk(basketId, {
      attributes: ['id'],
      include: [{ model: GameModel, attributes: ['id', 'name', 'price', 'count'] }],
    });
    return basket;
  }

  getOne(params) {
    return BasketModel.findOne(params);
  }

  getAll(params) {
    return BasketModel.fildAll(params);
  }
}

export default new Basket();

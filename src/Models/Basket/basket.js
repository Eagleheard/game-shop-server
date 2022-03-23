import { Basket as BasketModel } from '@models/Basket/index.js';
import { Game as GameModel } from '@models/Game/index.js';
import { BasketGame as BasketGameModel } from '@models/BasketGame/index.js';

class Basket {
  create() {
    const basket = BasketModel.create();
    return basket;
  }

  getById(basketId) {
    let basket = BasketModel.findByPk(basketId, {
      attributes: ['id'],
      include: [{ model: GameModel, attributes: ['id', 'name', 'price', 'count'] }],
    });
    return basket;
  }

  append({basketId, gameId, quantity}) {
    let basket = BasketModel.findByPk(basketId, {
      attributes: ['id'],
      include: [{ model: GameModel, attributes: ['id', 'name', 'price', 'count'] }],
    });
    const basketProduct = BasketGameModel.getOne({
      where: { basketId, gameId },
    });
    if (basketProduct) {
      basketProduct.increment('quantity', { by: quantity });
    } else {
      BasketGameModel.create({ basketId, gameId, quantity });
    }
    basket.reload();
    return basket;
  }

  increment(basketId, gameId, quantity) {
    let basket = BasketModel.findByPk(basketId, {
      include: [{ model: GameModel, as: 'games' }],
    });
    const basketProduct = BasketGameModel.findOne({
      where: { basketId, gameId },
    });
    basketProduct.increment('quantity', { by: quantity });
    basket.reload();
    return basket;
  }

  decrement(basketId, gameId, quantity) {
    let basket = BasketModel.findByPk(basketId, {
      include: [{ model: GameModel, as: 'games' }],
    });
    const basketProduct = BasketGameModel.findOne({
      where: { basketId, gameId },
    });
    if (basketProduct) {
      if (basketProduct.quantity > quantity) {
        basketProduct.decrement('quantity', { by: quantity });
      } else {
        basketProduct.destroy();
      }
      basket.reload();
    }
    return basket;
  }

  remove(basketId, gameId) {
    let basket = BasketModel.findByPk(basketId, {
      include: [{ model: GameModel, as: 'games' }],
    });
    const basketProduct = BasketGameModel.findOne({
      where: { basketId, gameId },
    });
    if (basketProduct) {
      basketProduct.destroy();
      basket.reload();
    }
    return basket;
  }

  clear(basketId) {
    let basket = BasketModel.findByPk(basketId, {
      include: [{ model: GameModel, as: 'games' }],
    });
    BasketGameModel.destroy({ where: { basketId } });
    basket.reload();
    return basket;
  }
}

export default new Basket();

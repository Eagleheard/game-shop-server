import jwt from 'jsonwebtoken';

import appError from '@errors/appError.js';

import gameModule from '@models/Game/game.js';
import basketModule from '@models/Basket/basket.js';

class Basket {
  async addGame(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const game = await gameModule.getOne(req.query);
      if (!game) {
        next(appError.badRequest('Required quantity does not exist'));
      }
      const options = { game, user, count: req.query.value };
      let basket = await basketModule.getOne({ game, user });
      if (!basket) {
        basket = await basketModule.create(options);
        return res.status(201).json(basket);
      }
      if (basket && parseInt(basket.count) + parseInt(req.query.value) <= parseInt(game.count)) {
        basket.increment('count', { by: req.query.value });
        return res.status(201).json(basket);
      }
      if (parseInt(basket.count) + parseInt(req.query.value) > parseInt(game.count)) {
        next(appError.badRequest('Required quantity does not exist'));
      }
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async decrementGame(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const game = await gameModule.getOne(req.query);
      if (!game) {
        next(appError.badRequest('Required quantity does not exist'));
      }
      let basket = await basketModule.getOne({ game, user });
      if (basket && parseInt(basket.count) - parseInt(req.query.value) > 0) {
        basket.decrement('count', { by: req.query.value });
        return res.status(201).json(basket);
      }
      if (parseInt(basket.count) - parseInt(req.query.value) <= 0) {
        next(appError.badRequest('Quantity cannot be less than zero'));
      }
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getBasket(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      let basket = await basketModule.getAll({ user });
      if (!basket) {
        basket = await basketModule.create();
      }
      return res.status(200).json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async removeGame(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const game = await gameModule.getOne(req.params);
      const basket = await basketModule.getAll({ user });
      if (!basket) {
        next(appError.badRequest('Cart not found'));
      }
      await basketModule.delete({ user, game });
      return res.json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async removeAllGames(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await basketModule.getAll({ user });
      if (!basket) {
        next(appError.badRequest('Cart not found'));
      }
      await basketModule.delete({ user });
      return res.json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Basket();

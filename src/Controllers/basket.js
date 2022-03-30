import jwt from 'jsonwebtoken';

import appError from '@errors/appError.js';

import gameModule from '@models/Game/game.js';
import basketModule from '@models/Basket/basket.js';

class Basket {
  async addGameToCart(req, res, next) {
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
        await basketModule.create(options);
        game.decrement('count', { by: req.query.value });
        game.reload();
        basket = await basketModule.getOne({ game, user });
        return res.status(201).json(basket);
      }
      if (parseInt(req.query.value) <= parseInt(game.count)) {
        await basket.increment('count', { by: req.query.value });
        await game.decrement('count', { by: req.query.value });
        await game.reload();
        await basket.reload();
        return res.status(201).json(basket);
      } else {
        next(appError.badRequest('Required quantity does not exist'));
      }
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async decrementGameFromCart(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const game = await gameModule.getOne({gameId: req.query.gameId});
      if (!game) {
        next(appError.badRequest('Required quantity does not exist'));
      }
      const basket = await basketModule.getOne({ game, user });
      if (parseInt(req.query.value) > 0 && parseInt(basket.count) !== 0) {
        await basket.decrement('count', { by: req.query.value });
        await game.increment('count', { by: req.query.value });
        await basket.reload();
        await game.reload();
        return res.status(201).json(basket);
      } else {
        next(appError.badRequest('Quantity cannot be less than zero'));
      }
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getCart(req, res, next) {
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

  async removeGameFromCart(req, res, next) {
    try {
      const token = req.headers.cookie.split('=')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const game = await gameModule.getOne(req.params);
      const basket = await basketModule.getOne({ user, game });
      if (!basket) {
        next(appError.badRequest('Cart not found'));
      }
      await basketModule.delete({ user, game });
      return res.json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async removeAllGamesFromCart(req, res, next) {
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

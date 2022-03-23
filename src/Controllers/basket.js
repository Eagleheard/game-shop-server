import BasketModel from '@models/Basket/basket.js';

import AppError from '@errors/appError.js';

class Basket {
  async getOne(req, res, next) {
    try {
      console.log(req.headers.cookies);
      let basket;
      if (req.headers.cookies.basketId) {
        basket = await BasketModel.getById((req.headers.cookies.basketId));
      } else {
        basket = await BasketModel.create();
      }
      res
      .cookie('basketId', basket.id, { httpOnly: true })
      .json(basket);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async append(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        let created = await BasketModel.create();
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const { gameId, quantity } = req.params;
      const basket = await BasketModel.append(basketId, gameId, quantity);
      res.cookie('basketId', basket.id, { httpOnly: true });
      res.json(basket);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async remove(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        let created = await BasketModel.create();
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const basket = await BasketModel.remove(basketId, req.params.gameId);
      res.cookie('basketId', basket.id, { httpOnly: true, signed: true });
      res.json(basket);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async clear(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        let created = await BasketModel.create();
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const basket = await BasketModel.clear(basketId);
      res.cookie('basketId', basket.id, { httpOnly: true, signed: true });
      res.json(basket);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }
}

export default new Basket();

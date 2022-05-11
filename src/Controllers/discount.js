import appError from '@errors/appError.js';

import discountModule from '@models/Discount/discount.js';
import gameModule from '@models/Game/game.js';

class Discount {
  async create(req, res, next) {
    try {
      const game = await gameModule.getOne({ gameName: req.body.gameName });
      const discount = await discountModule.create({
        startDiscount: req.body.startDiscount,
        endDiscount: req.body.endDiscount,
        discountCount: req.body.discountCount,
        gameId: game.id,
      });
      return res.status(201).json(discount);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const discount = await discountModule.getAll();
      res.status(200).json(discount);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Discount();

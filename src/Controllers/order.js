import orderModule from '@models/Order/order.js';
import basketModule from '@models/Basket/basket.js';

import appError from '@errors/appError.js';

class Order {
  async create(req, res, next) {
    try {
      const user = req.user;
      console.log(user);
      const cartGames = await basketModule.getAll({ user });
      if (!cartGames) {
        next(appError.badRequest('Cart is empty'));
      }
      cartGames.forEach(async ({ quantity, gameId }) => {
        const options = {
          userId: user.id,
          name: user.name + ' ' + user.lastName,
          email: user.email,
          quantity,
          gameId,
        };
        await orderModule.create(options);
      });
      await basketModule.delete({ user });
      const orders = await orderModule.getAll({ userId: user.id });
      res.status(201).json(orders);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async userGetAll(req, res, next) {
    try {
      const user = req.user;
      const orders = await orderModule.getAll({ userId: user.id, order: req.query.order });
      res.status(200).json(orders);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Order();

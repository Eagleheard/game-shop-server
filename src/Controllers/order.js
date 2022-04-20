import orderModule from '@models/Order/order.js';
import basketModule from '@models/Basket/basket.js';
import achievementModule from '@models/Achievement/achievement.js';

import appError from '@errors/appError.js';

class Order {
  async create(req, res, next) {
    try {
      const user = req.user;
      const cartGames = await basketModule.getAll({ user });
      if (cartGames.length === 0) {
        next(appError.badRequest('Cart is empty'));
      }
      const createdOrder = await Promise.all(
        cartGames.map(
          async ({ quantity, gameId }) =>
            await orderModule.create({
              address: req.body.address,
              zipCode: req.body.zipCode,
              comment: req.body.comment,
              userId: user.id,
              name: user.name + ' ' + user.lastName,
              email: user.email,
              quantity,
              gameId,
            }),
        ),
      );
      const achievementParams = {};
      if (createdOrder.map(({ game }) => game.disk)) {
        achievementParams.gameType = 'disk';
      }
      if (createdOrder.map(({ game }) => game.digital)) {
        achievementParams.gameType = 'digital';
      }
      if (createdOrder.map(({ game }) => game.digital && game.disk)) {
        achievementParams.gameType = 'edition';
      }
      const userOrders = await orderModule.getAll({ userId: user.id });
      achievementParams.gameCount = userOrders.reduce(
        (accumulator, { quantity }) => accumulator + quantity,
        0,
      );
      const claimedAchieve = await achievementModule.getAllAchievements(achievementParams);
      claimedAchieve.forEach(async ({ id }) => {
        const achieve = await achievementModule.getOne(id);
        if (!achieve) {
          await achievementModule.create({
            achievementId: id,
            userId: user.id,
            isAchieved: true,
          });
        }
      });
      res.status(201).json(createdOrder);
      await basketModule.delete({ user });
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

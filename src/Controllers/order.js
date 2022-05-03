import orderModule from '@models/Order/order.js';
import basketModule from '@models/Basket/basket.js';
import achievementModule from '@models/Achievement/achievement.js';
import userAchievementModule from '@models/Achievement/userAchievement.js';

import appError from '@errors/appError.js';

class Order {
  async create(req, res, next) {
    try {
      const user = req.user;
      const achievementParams = {};
      const cartGames = await basketModule.getAll({ user });
      if (cartGames.length === 0) {
        next(appError.badRequest('Cart is empty'));
      }
      const createdOrder = await Promise.all(
        cartGames.map(({ quantity, gameId }) =>
          orderModule.create({
            address: req.body.address,
            zipCode: req.body.zipCode,
            comment: req.body.comment,
            userId: user.id,
            name: user.name + ' ' + user.lastName,
            email: user.email,
            quantity: quantity ? quantity : 1,
            gameId,
          }),
        ),
      );
      const userOrders = await orderModule.getAll({ userId: user.id });
      userOrders.forEach(({ game }) => {
        if (game.disk) {
          achievementParams.disk = 'disk';
        }
        if (game.digital) {
          achievementParams.digital = 'digital';
        }
        if (game.disk && game.digital) {
          achievementParams.edition = 'edition';
        }
      });
      achievementParams.gameCount = userOrders.reduce(
        (accumulator, { quantity }) => accumulator + quantity,
        0,
      );
      const achievements = await achievementModule.getAllAchievements(achievementParams);
      await Promise.all(
        achievements.map(async ({ id }) => {
          userAchievementModule.getOrCreate({
            id,
            achievementId: id,
            userId: user.id,
            isAchieved: true,
          });
        }),
      );
      await basketModule.delete({ user });
      res.status(201).json(createdOrder);
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

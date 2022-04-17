import achievementModule from '@models/Achievement/achievement.js';
import orderModule from '@models/Order/order.js';
import appError from '@errors/appError.js';

class Achievement {
  async getAll(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        next(appError.notFound('User does not exist'));
      }
      let achievement = await achievementModule.getAll(user.id);
      if (achievement.length === 0) {
        await achievementModule.create(user.id);
        achievement = await achievementModule.getAll(user.id);
        return res.status(201).json(achievement);
      }
      if (achievement.length > 0) {
        const achievementParams = {};
        const userOrders = await orderModule.getAll({ userId: user.id });
        userOrders.forEach(({ game }) => {
          if (game.disk) {
            achievementParams.gameType = 'disk';
          }
          if (game.digital) {
            achievementParams.gameType = 'digital';
          }
        });
        achievementParams.gameCount = userOrders.reduce(
          (accumulator, { quantity }) => accumulator + quantity,
          0,
        );
        const claimedAchieve = await achievementModule.getAllAchievements(achievementParams);
        claimedAchieve.forEach(async ({ id }) => {
          await achievementModule.update({ achievementId: id, userId: user.id });
          achievement = await achievementModule.getAll(user.id);
          return res.status(200).json(achievement);
        });
      }
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
  async create(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        next(appError.notFound('User does not exist'));
      }
      let achievement = await achievementModule.create(user.id);
      return res.status(201).json(achievement);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Achievement();

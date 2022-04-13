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
      if (!achievement.length) {
        achievement = await achievementModule.create(user.id);
        achievement = await achievementModule.getAll(user.id);
        return res.status(200).json(achievement);
      } else {
        const userOrders = await orderModule.getAll(user.id);
        const achievementParams = {}
        achievementParams.gameCount = userOrders.reduce(
          (accumulator, { quantity }) => accumulator + quantity,
          0,
        )
        userOrders.forEach(({ game }) => {
          if (game.disk) {
            achievementParams.gameType = 'disk'
          } else {
            achievementParams.gameType = 'digital'
          }
        });
        console.log(achievementParams);
        const claimedAchieve = await achievementModule.getOne(achievementParams);
        if (!claimedAchieve) {
            return res.status(200).json(achievement);
        }
        const options = { achievementId: claimedAchieve.id, userId: user.id };
        await achievementModule.update(options);
        achievement = await achievementModule.getAll(user.id);
        return res.status(201).json(achievement);
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
  async update(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        next(appError.notFound('User does not exist'));
      }
      const claimedAchieve = await achievementModule.getOne(req.query.achievement);
      if (!claimedAchieve) {
          next(appError.badRequest('Selected achievement does not exist'))
      }
      const options = { achievementId: claimedAchieve.id, userId: user.id };
      await achievementModule.update(options);
      return res.status(200).json({ message: 'achieve claimed!' });
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Achievement();

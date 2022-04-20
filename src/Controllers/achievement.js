import achievementModule from '@models/Achievement/achievement.js';

import appError from '@errors/appError.js';

class Achievement {
  async getAll(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        next(appError.notFound('User does not exist'));
      }
      const achievement = await achievementModule.getAll(user.id);
      const notAchieved = await achievementModule.getAllNotAchieved();
      const allAchievements = notAchieved.filter(({ id }) =>
        achievement.every(({ achievementId }) => achievementId !== id),
      );
      return res.status(200).json([...achievement, ...allAchievements]);
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

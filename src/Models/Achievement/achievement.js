import Sequelize from 'sequelize';
import { Op } from 'sequelize';

import { Achievement as achievementModule } from '@models/Achievement/index.js';
import { UserAchievement as userAchievementModule } from '@models/Achievement/junction.js';

class Achievement {
  getAll(userId) {
    return userAchievementModule.findAll({
      where: { userId },
      order: [['isAchieved', 'DESC']],
      include: {
        model: achievementModule,
        attributes: ['name', 'description', 'discount'],
      },
    });
  }
  create(userId) {
    return userAchievementModule.bulkCreate([
      { achievementId: 1, userId: userId, isAchieved: true },
      { achievementId: 2, userId: userId },
      { achievementId: 3, userId: userId },
      { achievementId: 4, userId: userId },
      { achievementId: 5, userId: userId },
    ]);
  }

  getOne({ gameCount, gameType }) {
    return userAchievementModule.findOne({
      where: {
        ['$achievement.description$']: { [Op.substring && Op.or]: [gameCount, gameType] },
      },
      include: {
        model: achievementModule,
        attributes: ['name', 'description', 'discount'],
      },
    });
  }
  update({ userId, achievementId }) {
    return userAchievementModule.update(
      {
        isAchieved: true,
      },
      {
        where: {
          userId,
          achievementId,
        },
      },
    );
  }
}
export default new Achievement();

import Sequelize from 'sequelize';
import { Op } from 'sequelize';

import { Achievement as achievementModule } from '@models/Achievement/index.js';
import { UserAchievement as userAchievementModule } from '@models/Achievement/junction.js';

class Achievement {
  getAll(userId) {
    return userAchievementModule.findAll({
      where: { userId },
      include: {
        model: achievementModule,
        attributes: ['name', 'description', 'discount'],
      },
    });
  }
  create(userId) {
    return userAchievementModule.bulkCreate([
      { achievementId: 1, userId: userId },
      { achievementId: 2, userId: userId },
      { achievementId: 3, userId: userId },
      { achievementId: 4, userId: userId },
      { achievementId: 5, userId: userId },
    ]);
  }

  getOne(achievement) {
    return userAchievementModule.findOne({
      where: {
        ['$achievement.name$']: { [Op.substring]: achievement },
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

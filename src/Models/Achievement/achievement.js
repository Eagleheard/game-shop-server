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

  getAllNotAchieved() {
    return achievementModule.findAll();
  }

  getOne(achievementId) {
    return userAchievementModule.findOne({
      where: {
        achievementId,
      },
    });
  }
  create(data) {
    return userAchievementModule.create(data);
  }

  getAllAchievements({ gameCount, gameType }) {
    return achievementModule.findAll({
      where: {
        [Op.or]: [
          { trigger: { [Op.lte]: [gameCount] } },
          { description: { [Op.substring]: gameType } },
        ],
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

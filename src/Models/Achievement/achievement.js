import { Op } from 'sequelize';

import { Achievement as achievementModule } from '@models/Achievement/index.js';

class Achievement {
  getAllNotAchieved() {
    return achievementModule.findAll();
  }

  getAllAchievements({ gameCount, disk, digital }) {
    const gameType = [];
    if (disk && digital) {
      gameType.push('edition');
    } else if (disk) {
      gameType.push(disk);
    } else if (digital) {
      gameType.push(digital);
    }
    return achievementModule.findAll({
      where: {
        [Op.or]: [
          { trigger: { [Op.lte]: [gameCount] } },
          { description: { [Op.substring]: gameType } },
        ],
      },
    });
  }
}

export default new Achievement();

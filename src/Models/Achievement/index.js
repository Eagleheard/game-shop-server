import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { UserAchievement } from './junction';

export const Achievement = database.define('achievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(25),
    nique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    nique: true,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DOUBLE,
  },
});

Achievement.hasMany(UserAchievement);
UserAchievement.belongsTo(Achievement);

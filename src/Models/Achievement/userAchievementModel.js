import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

export const UserAchievement = database.define('userAchievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isAchieved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

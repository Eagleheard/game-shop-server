import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

export const Genre = database.define('genre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

export const Genre = database.define('genre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  genreName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

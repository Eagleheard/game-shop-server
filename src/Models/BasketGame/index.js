import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

export const BasketGame = database.define('basket_game', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  gameId: {
    type: DataTypes.INTEGER
  },
});

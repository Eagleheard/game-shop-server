import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Game } from '@models/Game/index.js';
import User from '@models/User/index.js';

export const Basket = database.define('basket', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true,
  }
});

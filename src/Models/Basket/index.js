import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { BasketGame } from '@models/BasketGame/index.js';

export const Basket = database.define('basket', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
});

Basket.hasMany(BasketGame);
BasketGame.belongsTo(Basket);


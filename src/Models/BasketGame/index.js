import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Basket } from '@models/Basket/index.js';
import { Game } from '@models/Game/index.js';

export const BasketGame = database.define('basket_game', {
  quantity: { 
    type: DataTypes.INTEGER,
    defaultValue: 1 
  }
});

Game.hasMany(BasketGame);
BasketGame.belongsTo(Game);

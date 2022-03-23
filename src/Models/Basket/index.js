import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Game } from '@models/Game/index.js';
import { BasketGame } from '@models/BasketGame/index.js';

export const Basket = database.define('basket', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  }
});

Basket.hasMany(BasketGame);
BasketGame.belongsTo(Basket);

Basket.belongsToMany(Game, { through: BasketGame, onDelete: 'CASCADE' });
Game.belongsToMany(Basket, { through: BasketGame, onDelete: 'CASCADE' });

import { database } from '@config/database.js';
import { DataTypes } from 'sequelize';

import User from '@models/User/index.js';
import { BasketGame } from '@models/BasketGame/index.js';

export const Basket = database.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketGame)
BasketGame.belongsTo(Basket)

import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Game } from '@models/Game/index.js';

export const Discount = database.define(
  'discount',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    discountCount: {
      type: DataTypes.INTEGER,
    },
    startDiscount: {
      type: DataTypes.DATE,
    },
    endDiscount: {
      type: DataTypes.DATE,
    },
    gameId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    formatedStartDiscount: {
      type: DataTypes.VIRTUAL,
      get() {
        const value = this.getDataValue('startDiscount');
        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();
        return day + '.' + month + '.' + year;
      },
    },
    formatedEndDiscount: {
      type: DataTypes.VIRTUAL,
      get() {
        const value = this.getDataValue('endDiscount');
        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();
        return day + '.' + month + '.' + year;
      },
    },
  },
  { timestamps: true },
);

Discount.hasMany(Game);
Game.belongsTo(Discount, { foreignKey: 'discountId' });
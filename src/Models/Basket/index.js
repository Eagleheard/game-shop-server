import { database } from '@config/database.js';
import { DataTypes } from 'sequelize';

export const Basket = database.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
});

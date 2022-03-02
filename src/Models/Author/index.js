import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

export const Author = database.define('author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(15),
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING(100),
  },
});

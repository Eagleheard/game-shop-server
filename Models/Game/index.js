import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

export const Game = database.define('game', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false 
    },
    price: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    digital: { 
      type: DataTypes.BOOLEAN 
    },
    disk: { 
      type: DataTypes.BOOLEAN 
    },
    count: { 
      type: DataTypes.INTEGER 
    },
    popularity: { 
      type: DataTypes.INTEGER 
    },
    image: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  });


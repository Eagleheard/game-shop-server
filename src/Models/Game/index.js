import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Genre } from '@models/Genre/index.js';
import { Author } from '@models/Author/index.js';

export const Game = database.define('game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  digital: {
    type: DataTypes.BOOLEAN,
  },
  disk: {
    type: DataTypes.BOOLEAN,
  },
  count: {
    type: DataTypes.INTEGER,
  },
  popularity: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
  },
  isNew: {
    type: DataTypes.BOOLEAN,
  },
  isPreview: {
    type: DataTypes.BOOLEAN,
  },
  preview: {
    type: DataTypes.STRING,
  },
});

Genre.hasMany(Game, { onDelete: 'RESTRICT' });
Game.belongsTo(Genre, { foreignKey: 'genreId' });

Author.hasMany(Game, { onDelete: 'CASCADE' });
Game.belongsTo(Author, { foreignKey: 'authorId' });

import { Op } from 'sequelize';

import { Game as gameModule } from './index.js';
import { Genre as genreModule } from '@models/Genre/index.js';
import { Author as authorModule } from '@models/Author/index.js';

class Game {
  getAll({
    dataLimit,
    currentPage,
    authorId,
    genreId,
    gameId,
    isNew,
    isPreview,
    order,
    digital,
    disk,
    count,
    price,
  }) {
    const offset = (currentPage - 1) * dataLimit;
    const where = {};
    const orderBy = [];
    if (gameId) {
      where.id = gameId;
    }
    if (genreId) {
      where.genreId = genreId;
    }
    if (authorId) {
      where.authorId = authorId;
    }
    if (price) {
      where.price = price;
    }
    if (digital) {
      where.digital = digital;
    }
    if (disk) {
      where.disk = disk;
    }
    if (count) {
      where.count = count;
    }
    if (isNew) {
      where.isNew = isNew;
    }
    if (order) {
      orderBy.push([order, 'DESC']);
    }
    if (isPreview) {
      where.isPreview = isPreview;
    }
    if (price) {
      where.price = price;
    }

    return gameModule.findAll({
      limit: dataLimit,
      offset,
      order: orderBy,
      where,
      include: [
        { model: genreModule, as: 'genre' },
        { model: authorModule, as: 'author' },
      ],
    });
  }

  getOne({ gameId, value }) {
    const where = {};
    if (gameId) {
      where.id = gameId;
    }
    if (value) {
      where.count = { [Op.gte]: [value] };
    }
    return gameModule.findOne({ where });
  }

  getById({ id }) {
    return gameModule.findByPk(id, {
      include: [
        { model: genreModule, as: 'genre' },
        { model: authorModule, as: 'author' },
      ],
    });
  }

  create(data) {
    return gameModule.create(data);
  }

  async update(id, data) {
    const game = await gameModule.findByPk(id);
    await game.update(data);
    return game;
  }

  async delete(id) {
    const game = await gameModule.findByPk(id);
    await game.destroy();
    return game;
  }
}

export default new Game();

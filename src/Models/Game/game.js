import { Game as gameModule } from './index.js';
import { Genre as genreModule } from '@models/Genre/index.js';
import { Author as authorModule } from '@models/Author/index.js';

class Game {
  getAll({
    limit,
    currentPage,
    authorId,
    genreId,
    isNew,
    isPreview,
    isOrder,
    digital,
    disk,
    count,
    price,
  }) {
    const offset = (currentPage - 1) * limit;
    const where = {};
    const order = [];
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
    if (isOrder) {
      order.push([isOrder, 'DESC']);
    }
    if (isPreview) {
      where.isPreview = isPreview;
    }
    if (price) {
      where.price = price;
    }

    return gameModule.findAll({
      limit,
      offset,
      order,
      where,
      include: [
        { model: genreModule, as: 'genre' },
        { model: authorModule, as: 'author' },
      ],
    });
  }

  getById(id) {
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

import { Order as orderModule } from './index.js';
import { Game as gameModel } from '@models/Game/index.js';
import { Genre as genreModule } from '@models/Genre/index.js';
import { Author as authorModule } from '@models/Author/index.js';

class Order {
  getAll({ userId, order }) {
    const orderBy = [];
    if (order === 'Newest') {
      orderBy.push(['createdAt', 'DESC']);
    }
    if (order === 'Oldest') {
      orderBy.push(['createdAt', 'ASC']);
    }
    return orderModule.findAll({
      where: {
        userId,
      },
      order: orderBy,
      include: {
        model: gameModel,
        attributes: ['id', 'name', 'price', 'image', 'disk', 'digital'],
      },
    });
  }

  adminGetAll({ order }) {
    const orderBy = [];
    if (order === 'Newest') {
      orderBy.push(['createdAt', 'ASC']);
    }
    if (order === 'Oldest') {
      orderBy.push(['createdAt', 'DESC']);
    }
    return orderModule.findAll({
      order: orderBy,
      include: {
        model: gameModel,
        attributes: ['id', 'name', 'price', 'image', 'disk', 'digital'],
        include: [
          { model: genreModule, as: 'genre' },
          { model: authorModule, as: 'author' },
        ],
      },
    });
  }

  create(data) {
    return orderModule.create(data);
  }
}

export default new Order();

import { Order as orderModule } from './index.js';
import { Game as gameModel } from '@models/Game/index.js';

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

  async create(data) {
    const game = await orderModule.create(data);
    return orderModule.findByPk(game.id, {
      include: {
        model: gameModel,
        attributes: ['id', 'name', 'price', 'image', 'disk', 'digital'],
      },
    });
  }
}

export default new Order();

import { Order as orderModule } from './index.js';
import { Game as gameModel } from '@models/Game/index.js';

class Order {
  getAll({ userId, order }) {
    const orderBy = [];
    if (order === 'Newest') {
      orderBy.push(['createdAt', 'DESC']);
    }
    if (order === 'Eldest') {
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

  async getOne(id, userId = null) {
    const options = {
      where: { id },
      include: [
        { model: OrderItemMapping, as: 'items', attributes: ['id', 'name', 'price', 'quantity'] },
      ],
    };
    if (userId) options.where.userId = userId;
    const order = await orderModule.findOne(options);
    if (!order) {
      throw new Error('Заказ не найден в БД');
    }
    return order;
  }

  create(data) {
    return orderModule.create(data);
  }

  async delete(id) {
    let order = await orderModule.findByPk(id, {
      include: [{ model: OrderItemMapping, attributes: ['name', 'price', 'quantity'] }],
    });
    if (!order) {
      throw new Error('Заказ не найден в БД');
    }
    await order.destroy();
    return order;
  }
}

export default new Order();

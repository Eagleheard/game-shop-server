import { Game as gameModule } from './index.js';

class Game {
  async getAll({ limit, page }) {
    const offset = (page - 1) * limit;
    const game = await gameModule.findAll({ limit, offset });
    return game;
  }

  async getOne(id) {
    const game = await gameModule.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  }

  async create({ name, price, digital, disk, count, popularity, image, genreId, authorId }) {
    const game = await gameModule.create({
      name,
      price,
      image,
      digital,
      disk,
      count,
      popularity,
      genreId,
      authorId,
    });
    return game;
  }

  async update(id, { name, price, image, digital, disk, count, popularity }) {
    const game = await gameModule.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }
    await game.update({ name, price, image, digital, disk, count, popularity });
    return game;
  }

  async delete(id) {
    const game = await gameModule.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }
    await game.destroy();
    return game;
  }
}

export default new Game();

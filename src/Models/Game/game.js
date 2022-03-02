import { Game as gameModule } from './index.js';

class Game {
  async getAll({ dataLimit, currentPage }) {
    const offset = (currentPage - 1) * dataLimit;
    const game = await gameModule.findAll({ dataLimit, offset });
    return game;
  }

  async getById(id) {
    const game = await gameModule.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  }

  async create(data) {
    const game = await gameModule.create(data);
    return game;
  }

  async update(id, data) {
    const game = await gameModule.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }
    await game.update(data);
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

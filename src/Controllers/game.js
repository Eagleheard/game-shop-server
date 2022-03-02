import gameModule from '@models/Game/game.js';
import appError from '@errors/appError.js';

class Game {
  async getAll({ params, query: { limit, page } }, res, next) {
    try {
      const dataLimit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 4;
      const currentPage = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
      const options = { dataLimit, currentPage };
      const games = await gameModule.getAll(options, params);
      res.status(200).json(games);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const game = await gameModule.getById(req.params.id);
      if (!game) {
        throw new Error('Game not found');
      }
      res.status(200).json(game);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const game = await gameModule.create(req.body);
      res.status(201).json(game);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const game = await gameModule.update(req.params.id, req.body);
      if (!game) {
        throw new Error('Game not found');
      }
      res.status(201).json(game);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const game = await gameModule.delete(req.params.id);
      if (!game) {
        throw new Error('Game not found');
      }
      res.status(200).json(game);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Game();

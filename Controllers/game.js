import gameModule from '../Models/Game/game.js';
import appError from '../Errors/appError.js';

class Game {
  async getAll({ query: { limit, page } }, res, next) {
    try {
      limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 4;
      page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
      const options = { limit, page };
      const games = await gameModule.getAll(options);
      res.json(games);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const game = await gameModule.getOne(req.params.id);
      res.json(game);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const game = await gameModule.create(req.body);
      res.json(game);
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
      res.json(game);
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
      res.json(game);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Game();

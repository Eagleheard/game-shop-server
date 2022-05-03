import gameModule from '@models/Game/game.js';
import appError from '@errors/appError.js';

class Game {
  async getAll({ query, query: { limit, page } }, res, next) {
    try {
      const dataLimit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : null;
      const currentPage = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
      const options = { dataLimit, currentPage, ...query };
      const games = await gameModule.getAll(options);
      if (!games) {
        next(appError.notFound('Games does not exists'));
      }
      res.status(200).json(games);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const game = await gameModule.getById(req.params.id);
      if (!game) {
        next(appError.notFound('Selected game does not exist'));
      }
      res.status(200).json(game);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const game = await gameModule.create(req.body);
      res.status(201).json(game);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const game = await gameModule.update(req.params.id, req.body);
      if (!game) {
        next(appError.notFound('Selected game does not exist'));
      }
      res.status(200).json(game);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const game = await gameModule.delete(req.params.id);
      if (!game) {
        next(appError.notFound('Selected game does not exist'));
      }
      res.status(200).json(game);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Game();

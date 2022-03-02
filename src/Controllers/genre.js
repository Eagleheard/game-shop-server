import genreModule from '../Models/Genre/genre.js';
import appError from '../Errors/appError.js';

class Genre {
  async getAll(req, res, next) {
    try {
      const genre = await genreModule.getAll();
      res.json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const genre = await genreModule.getById(req.params.id);
      res.json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const genre = await genreModule.create(req.body);
      res.json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const genre = await genreModule.update(req.params.id, req.body);
      res.json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const genre = await genreModule.delete(req.params.id);
      res.json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Genre();

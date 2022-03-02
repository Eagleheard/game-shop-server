import genreModule from '@models/Genre/genre.js';
import appError from '@errors/appError.js';

class Genre {
  async getAll(req, res, next) {
    try {
      const genre = await genreModule.getAll();
      if (!genre) {
        throw new Error('Genre not found');
      }
      res.status(200).json(genre);
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
      res.status(200).json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const genre = await genreModule.create(req.body);
      res.status(201).json(genre);
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
      if (!genre) {
        throw new Error('Genre not found');
      }
      res.status(201).json(genre);
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
      if (!genre) {
        throw new Error('Genre not found');
      }
      res.status(200).json(genre);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Genre();

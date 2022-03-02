import authorModule from '@models/Author/author.js';
import appError from '@errors/appError.js';

class Author {
  async getAll(req, res, next) {
    try {
      const author = await authorModule.getAll();
      res.status(200).json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const author = await authorModule.getById(req.params.id);
      if (!author) {
        throw new Error('Author not found');
      }
      res.status(200).json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const author = await authorModule.create(req.body);
      res.status(201).json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const author = await authorModule.update(req.params.id, req.body);
      if (!author) {
        throw new Error('Author not found');
      }
      res.status(201).json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const author = await authorModule.delete(req.params.id);
      if (!author) {
        throw new Error('Author not found');
      }
      res.status(200).json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Author();

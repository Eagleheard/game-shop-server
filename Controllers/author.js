import authorModule from '../Models/Author/author.js';
import appError from '../Errors/appError.js';

class Author {
  async getAll(req, res, next) {
    try {
      const author = await authorModule.getAll();
      res.json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found id');
      }
      const author = await authorModule.findByPk(req.params.id);
      res.json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const author = await authorModule.create(req.body);
      res.json(author);
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
      res.json(author);
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
      res.json(author);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Author();

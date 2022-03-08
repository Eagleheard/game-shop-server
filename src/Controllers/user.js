import userModule from '@models/User/user.js';
import AppError from '@errors/AppError.js';

class User {
  async signup(req, res, next) {
    res.status(200).send('Sign Up');
  }

  async login(req, res, next) {
    res.status(200).send('Log in');
  }

  async check(req, res, next) {
    res.status(200).send('Verification');
  }

  async getAll(req, res, next) {
    try {
      const users = await userModule.getAll();
      if (!users) {
        next(AppError.notFound('Users does not exist'));
      }
      res.status(200).json(users);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Id was not set'));
      }
      const user = await userModule.getById(req.params.id);
      if (!user) {
        next(AppError.notFound('Selected user does not exist'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const user = await userModule.create(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Id was not set'));
      }
      const user = await userModule.update(req.params.id, req.body);
      if (!user) {
        next(AppError.notFound('Selected user does not exist'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Id was not set'));
      }
      const user = await userModule.delete(req.params.id);
      if (!user) {
        next(AppError.notFound('Selected user does not exist'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }
}

export default new User();

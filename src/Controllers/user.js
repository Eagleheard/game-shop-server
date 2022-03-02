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
      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found Id');
      }
      const user = await userModule.getById(req.params.id);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const user = await userModule.create(req.body);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found Id');
      }
      const user = await userModule.update(req.params.id, req.body);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Not found Id');
      }
      const user = await userModule.delete(req.params.id);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();

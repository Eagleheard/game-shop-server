import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userModule from '@models/User/user.js';
import AppError from '@errors/AppError.js';

const createJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class User {
  async signup({ body: { email, password, role = 'USER' } }, res, next) {
    try {
      if (!email || !password) {
        next(AppError.badRequest('Empty email or password'));
      }
      if (role !== 'USER') {
        next(AppError.forbidden('You can register only as USER'));
      }
      const candidate = await userModule.getOne({ where: { email } });
      if (candidate) {
        next(AppError.badRequest('Email already registered'));
      }
      const hash = await bcrypt.hash(password, 5);
      const user = await userModule.create({ email, password: hash, role });
      const token = createJwt(user.id, user.email, user.role);
      return res.status(200).json({ token });
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async login({ body: { email, password } }, res, next) {
    try {
      const user = await userModule.getOne({ where: { email } });
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        next(AppError.badRequest('Wrong password'));
      }
      const token = createJwt(user.id, user.email, user.role);
      return res.status(200).json({ token });
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async check({ id, email, role }, res, next) {
    const token = createJwt(id, email, role);
    return res.status(200).json({ token });
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

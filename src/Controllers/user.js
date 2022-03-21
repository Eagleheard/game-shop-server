import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userModule from '@models/User/user.js';
import AppError from '@errors/appError.js';

const createJwt = (id, email, role, name, lastName) => {
  return jwt.sign({ id, email, role, name, lastName }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class User {
  async signup({ body: { name, lastName, email, password, role = 'USER' } }, res, next) {
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
      const user = await userModule.create({ name, lastName, email, password: hash, role });
      const token = createJwt(user.name, user.lastName, user.id, user.email, user.role);
      return res.status(200).json({ token });
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async login({ body: { email, password } }, res, next) {
    try {
      const user = await userModule.getOne({ where: { email } });
      if (!user) {
        next(AppError.notFound('User not found'));
      }
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        next(AppError.badRequest('Wrong password'));
      }
      const token = createJwt(user.id, user.email, user.role, user.name);
      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ id: user.id, email: user.email, name: user.name });
    } catch (e) {
      next(AppError.internalServerError(e.message));
    }
  }

  async logout(req, res) {
    return res
      .status(200)
      .cookie('access_token', 'none')
      .json({message: 'deleted'});
  }

  async check(req, res) {
    return res
      .status(200)
      .json({ id: req.user.id, email: req.user.email, role: req.user.role, name: req.user.name });
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
      next(appError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const user = await userModule.create(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const user = await userModule.update(req.params.id, req.body);
      if (!user) {
        next(appError.notFound('Selected user does not exist'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const user = await userModule.delete(req.params.id);
      if (!user) {
        next(appError.notFound('Selected user does not exist'));
      }
      res.status(200).json(user);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new User();

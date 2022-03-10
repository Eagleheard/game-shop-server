import jwt from 'jsonwebtoken';

import AppError from '@errors/AppError.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      next(AppError.unauthorized('Need authorization'));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.auth = decoded;
    next();
  } catch (e) {
    next(AppError.internalServerError(e.message));
  }
};

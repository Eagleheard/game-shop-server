import AppError from '../errors/AppError.js';

export const adminMiddleware = (req, res, next) => {
  try {
    if (req.auth.role !== 'ADMIN') {
      next(AppError.forbidden('Только для администратора'));
    }
    next();
  } catch (e) {
    next(AppError.internalServerError(e.message));
  }
};

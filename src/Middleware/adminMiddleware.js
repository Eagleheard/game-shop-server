import AppError from '../errors/appError.js';

export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      next(AppError.forbidden('Только для администратора'));
    }
    next();
  } catch (e) {
    next(AppError.internalServerError(e.message));
  }
};

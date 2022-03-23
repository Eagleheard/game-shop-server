import AppError from '../errors/appError.js';

export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      next(AppError.forbidden('Only for administrator'));
    }
    next();
  } catch (e) {
    next(AppError.internalServerError(e.message));
  }
};

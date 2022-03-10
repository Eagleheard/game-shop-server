import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import { adminMiddleware } from '@middleware/adminMiddleware.js';
import userController from '@controllers/user.js';

const router = new express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/', authMiddleware, adminMiddleware, userController.getAll);
router.get('/:id([0-9]+)', authMiddleware, adminMiddleware, userController.getById);
router.post('/', authMiddleware, adminMiddleware, userController.create);
router.put('/:id([0-9]+)', authMiddleware, adminMiddleware, userController.update);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, userController.delete);

export default router;

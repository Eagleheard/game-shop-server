import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import { adminMiddleware } from '@middleware/adminMiddleware.js';
import genreController from '@controllers/genre.js';

const router = new express.Router();

router.get('/', genreController.getAll);
router.get('/:id([0-9]+)', genreController.getById);
router.post('/', authMiddleware, adminMiddleware, genreController.create);
router.put('/:id([0-9]+)', authMiddleware, adminMiddleware, genreController.update);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, genreController.delete);

export default router;

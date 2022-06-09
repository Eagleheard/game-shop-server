import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import commentController from '@controllers/comments.js';

const router = new express.Router();

router.get('/:id([0-9]+)', authMiddleware, commentController.getAllByGame);
router.post('/:id([0-9]+)', authMiddleware, commentController.create);

export default router;

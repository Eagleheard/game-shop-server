import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import { adminMiddleware } from '@middleware/adminMiddleware.js';
import authorController from '@controllers/author.js';

const router = new express.Router();

router.get('/', authorController.getAll);
router.get('/:id([0-9]+)', authorController.getById);
router.post('/', authMiddleware, adminMiddleware, authorController.create);
router.put('/:id([0-9]+)', authMiddleware, adminMiddleware, authorController.update);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, authorController.delete);

export default router;

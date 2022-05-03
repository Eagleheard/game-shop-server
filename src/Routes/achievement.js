import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import { adminMiddleware } from '@middleware/adminMiddleware.js';
import achievementController from '@controllers/achievement.js';

const router = new express.Router();

router.get('/', authMiddleware, achievementController.getAll);

export default router;

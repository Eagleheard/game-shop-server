import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import { adminMiddleware } from '@middleware/adminMiddleware.js';
import orderController from '@controllers/order.js';

const router = new express.Router();

router.get('/user', authMiddleware, orderController.userGetAll);

export default router;
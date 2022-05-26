import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import { adminMiddleware } from '@middleware/adminMiddleware.js';
import discountController from '@controllers/discount.js';

const router = new express.Router();

router.post('/', authMiddleware, adminMiddleware, discountController.create);
router.get('/', authMiddleware, discountController.getAll);

export default router;

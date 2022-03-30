import express from 'express';

import { authMiddleware } from '@middleware/authMiddleware.js';
import BasketController from '@controllers/basket.js';

const router = new express.Router();

router.get('/', authMiddleware, BasketController.getBasket);
router.post('/', authMiddleware, BasketController.addGame);
router.put('/', authMiddleware, BasketController.decrementGame);
router.delete('/:gameId([0-9]+)', authMiddleware, BasketController.removeGame);
router.delete('/', authMiddleware, BasketController.removeAllGames);

export default router;

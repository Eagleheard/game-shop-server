import express from 'express';
import BasketController from '@controllers/basket.js';

const router = new express.Router();

router.get('/', BasketController.getBasket)
router.post('/', BasketController.addGame)
router.put('/', BasketController.decrementGame);
router.delete('/:gameId([0-9]+)', BasketController.removeGame);
router.delete('/', BasketController.deleteBasket);

export default router;

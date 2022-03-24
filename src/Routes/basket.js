import express from 'express';
import BasketController from '@controllers/basket.js';

const router = new express.Router();

router.get('/', BasketController.getBasket)
router.post('/', BasketController.addGame)
router.delete('/:id', BasketController.deleteGame);

export default router;

import express from 'express';
import BasketController from '@controllers/basket.js';

const router = new express.Router();

router.get('/', BasketController.getOne);
router.put('/append', BasketController.append);
router.put('/:gameId([0-9]+)/remove', BasketController.remove);
router.put('/clear', BasketController.clear);

export default router;

import express from 'express';

import gameController from '@controllers/game.js';

const router = new express.Router();

router.get('/', gameController.getAll);
router.get('/:popularity', gameController.getAll);
router.get('/:id([0-9]+)', gameController.getById);
router.post('/', gameController.create);
router.put('/:id([0-9]+)', gameController.update);
router.delete('/:id([0-9]+)', gameController.delete);

export default router;

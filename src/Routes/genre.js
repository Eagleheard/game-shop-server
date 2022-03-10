import express from 'express';

import genreController from '@controllers/genre.js';

const router = new express.Router();

router.get('/', genreController.getAll);
router.get('/:id([0-9]+)', genreController.getById);
router.post('/', genreController.create);
router.put('/:id([0-9]+)', genreController.update);
router.delete('/:id([0-9]+)', genreController.delete);

export default router;

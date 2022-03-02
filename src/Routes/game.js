import express from 'express';
import gameController from '@controllers/game.js';

const router = new express.Router();

router.get('/getall', gameController.getAll);
router.get('/getone/:id([0-9]+)', gameController.getById);
router.post('/create', gameController.create);
router.put('/update/:id([0-9]+)', gameController.update);
router.delete('/delete/:id([0-9]+)', gameController.delete);

export default router;

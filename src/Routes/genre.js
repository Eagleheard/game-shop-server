import express from 'express';
import genreController from '../Controllers/genre.js';

const router = new express.Router();

router.get('/getall', genreController.getAll);
router.get('/getone/:id([0-9]+)', genreController.getById);
router.post('/create', genreController.create);
router.put('/update/:id([0-9]+)', genreController.update);
router.delete('/delete/:id([0-9]+)', genreController.delete);

export default router;

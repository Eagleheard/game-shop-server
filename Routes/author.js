import express from 'express';
import authorController from '../Controllers/author.js';

const router = new express.Router();

router.get('/getall', authorController.getAll);
router.get('/getone/:id([0-9]+)', authorController.getOne);
router.post('/create', authorController.create);
router.put('/update/:id([0-9]+)', authorController.update);
router.delete('/delete/:id([0-9]+)', authorController.delete);

export default router;

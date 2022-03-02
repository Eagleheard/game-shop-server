import express from 'express';
import userController from '@controllers/user.js';

const router = new express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check', userController.check);

router.get('/getall', userController.getAll);
router.get('/getone/:id([0-9]+)', userController.getById);
router.post('/create', userController.create);
router.put('/update/:id([0-9]+)', userController.update);
router.delete('/delete/:id([0-9]+)', userController.delete);

export default router;

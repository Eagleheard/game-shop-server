import express from 'express';

import userController from '@controllers/user.js';

const router = new express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check', userController.check);

router.get('/', userController.getAll);
router.get('/:id([0-9]+)', userController.getById);
router.post('/', userController.create);
router.put('/:id([0-9]+)', userController.update);
router.delete('/:id([0-9]+)', userController.delete);

export default router;

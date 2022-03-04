import express from 'express';

import authorController from '@controllers/author.js';

const router = new express.Router();

router.get('/', authorController.getAll);
router.get('/:id([0-9]+)', authorController.getById);
router.post('/', authorController.create);
router.put('//:id([0-9]+)', authorController.update);
router.delete('/:id([0-9]+)', authorController.delete);

export default router;

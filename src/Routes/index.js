import express from 'express';

import game from './game.js';
import author from './author.js';
import user from './user.js';
import genre from './genre.js';
import achievement from './achievement.js';
import order from './order.js';

const router = new express.Router();

router.use('/game', game);
router.use('/author', author);
router.use('/user', user);
router.use('/genre', genre);
router.use('/achievement', achievement);
router.use('/order', order)

export default router;

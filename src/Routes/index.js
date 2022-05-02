import express from 'express';

import game from './game.js';
import author from './author.js';
import user from './user.js';
import genre from './genre.js';
import achievement from './achievement.js';
import order from './order.js';
import basket from './basket.js';

const router = new express.Router();

router.use('/game', game);
router.use('/author', author);
router.use('/user', user);
router.use('/genre', genre);
router.use('/achievement', achievement);
router.use('/order', order);
router.use('/basket', basket);

export default router;

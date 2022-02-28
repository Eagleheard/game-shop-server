import express from 'express';

import game from './game.js';
import author from './author.js';
import user from './user.js';
import genre from './genre.js';

const router = new express.Router();

router.use('/game', game);
router.use('/author', author);
router.use('/user', user);
router.use('/genre', genre);

export default router;

import { Genre } from './Genre/index.js';
import { Game } from './Game/index.js';
import {Author} from './Author/index.js';

Genre.hasMany(Game, { onDelete: 'RESTRICT' });
Game.belongsTo(Genre);

Author.hasMany(Game, { onDelete: 'RESTRICT' });
Game.belongsTo(Author);


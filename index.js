const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Notes App'));

app.listen(port, () => console.log(`notes-app listening on port ${port}!`));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('game_shop', 'postgres', 'Outcast00', {
  dialect: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

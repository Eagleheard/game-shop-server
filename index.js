const config = require('./Config/config');
const Sequelize = require('sequelize');


config.app.express.get('/', (req, res) => res.send('Notes App'));

config.app.express.listen(config.app.port, () => console.log(`notes-app listening on port ${config.app.port}!`));

const sequelize = new Sequelize('game_shop', 'postgres', 'Outcast00', {
  dialect: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

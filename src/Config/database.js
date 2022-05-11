import Sequelize from 'sequelize';

export const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    define: {
      underscored: true,
      timestamps: false,
    },
  },
);

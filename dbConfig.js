const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Change this to 'postgres' if using PostgreSQL
  logging: false,   // Disable SQL query logs
});

module.exports = sequelize;

const Sequelize = require('sequelize');
module.exports = db = new Sequelize('codegig', 'postgres', 'r5XYxp9FSHA7', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
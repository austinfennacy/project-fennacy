'use strict';

const dir = require('node-dir');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')
const db = {};

let sequelize;
if (process.env.JAWSDB_URL) {
  // for Heroku deployment
  sequelize = new Sequelize(process.env.JAWSDB_URL, {});
} else {
  sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
      dialect: 'mysql'
    });
}

dir
  .files(__dirname, {sync:true})
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== path.join(__dirname, basename)) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(file)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

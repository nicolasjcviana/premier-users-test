var Sequelize = require('sequelize');
const dbConfig = require('../config/db-config');

const sequelize = new Sequelize(dbConfig.URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user =  require('./user.model')(sequelize, Sequelize);

module.exports = db;
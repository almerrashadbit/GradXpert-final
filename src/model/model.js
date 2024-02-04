// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize);
const Movie = require('./movie')(sequelize, Sequelize);
const Bookmark = require('./bookmark')(sequelize, Sequelize);

const models = {
  User,
  Movie,
  Bookmark
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = models;

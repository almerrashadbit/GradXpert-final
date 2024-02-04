// models/Movie.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trailerURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Movie.associate = (models) => {
    Movie.belongsTo(models.User);
  };

  return Movie;
};

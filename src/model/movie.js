// models/Movie.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movie = sequelize.define('movie_table', {
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,    
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trailer_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    last_modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    timestamps: false
  });

  Movie.associate = (models) => {
    Movie.belongsTo(models.User, { foreignKey: 'user_id' });
    Movie.hasMany(models.Bookmark, { foreignKey: 'movie_id' });
  };

  return Movie;
};

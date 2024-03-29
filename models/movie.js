const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model { }

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    actors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imdb_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imdb_id: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
)

module.exports = Movie;

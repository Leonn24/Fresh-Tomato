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
        released: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          rating:
          {
            type: INTEGER, 
            validate: {
                max: 5,
                min: 1,
            }
          },
          title: {
            type: DataTypes.STRING, 
          }, 
          imdbID:{
            type :DataTypes.STRING ,
            unique :true
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
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Movie extends Model { }
Movie.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        actors: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        plot:{
            type: DataTypes.STRING,
            allowNull: true
        },
        releaseDate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        imdbRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                max: 10,
                min: 1,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }

    },
    {
        sequelize,
        // timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie',
    }
)
module.exports = Movie;
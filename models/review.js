const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        movie_review:
        {
            type: DataTypes.INTEGER,
            validate: {
                max: 5,
                min: 1,
            }
        }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'Review',
    }
)

module.exports = Review;
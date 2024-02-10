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
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //     }
        // },
        // movie_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'movie',
        //         key: 'id',
        //     }
        // }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'Review',
    }
)

module.exports = Review;
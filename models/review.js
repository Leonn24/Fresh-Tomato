const { Model, DataTypes, INTEGER } = require('sequelize');
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
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          movie_review:
          {
            type: INTEGER, 
            validate: {
                max: 5,
                min: 1,
            }
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
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    }
)

module.exports = Review
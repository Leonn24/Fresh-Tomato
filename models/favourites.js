const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favourite extends Model { }

Favourite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        imdb_id:
        {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'Favourite',
    }
)

module.exports = Favourite;
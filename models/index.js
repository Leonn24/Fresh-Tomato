const User = require('./user');
const Review = require('./review');
const Movie = require('./movie');
const Favourite = require('./favourites');


Review.belongsTo(Movie, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE'
})

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Favourite.belongsTo(User, {
    foreignKey: 'favourite_user_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Review, Movie, Favourite };


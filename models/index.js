const User = require('./user');
const Review = require('./review');
const Movie = require('./movie');

Movie.hasMany(Review, {
    foreignKey: 'movie_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',

});

Review.belongsTo(Movie, {
    foreignKey: 'movie_id',
    onDelete: 'SET NULL',

});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

});

module.exports = { User, Review, Movie };


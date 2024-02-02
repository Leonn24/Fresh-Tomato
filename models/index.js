const User = require('./user');
const Review = require('./review');
const Movie = require('./movie');

Movie.hasMany(Review, {
    foreignKey: 'movie_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Review, Movie };


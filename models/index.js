const User = require('./User');
const Review = require('./review');
const Movie = require('./Movie');

Movie.hasMany(Review, {
    foreignKey: 'movie_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Review, Movie };


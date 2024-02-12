const User = require('./user');
const Review = require('./review');
const Movie = require('./movie');


Review.belongsTo(Movie, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE'
})

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Movie.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })

module.exports = { User, Review, Movie };


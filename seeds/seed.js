const sequelize = require('../config/connection');
const { User, Review, Movie, Favourite } = require('../models');

const userData = require('./userData.json');
const movieData = require('./movieData.json');
const reviewData = require('./reviewData.json');
const favouritesData = require('./favouritesData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const movie of movieData) {
    await Movie.create({
      ...movie,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }
  for (const favourite of favouritesData) {
    await Favourite.create({
      ...favourite,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();
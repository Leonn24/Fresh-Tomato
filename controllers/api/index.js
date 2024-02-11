const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const movieRoutes = require('./movieRoutes');
const reviewRoutes = require('./reviewRoutes');
const favouriteRoutes = require('./favouriteRoutes');

router.use('/users', userRoutes);
// router.use('/movie', movieRoutes);
router.use('/review', reviewRoutes);
router.use('/favourites', favouriteRoutes)

module.exports = router;
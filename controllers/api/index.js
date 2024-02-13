const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const favouriteRoutes = require('./favouriteRoutes');

router.use('/users', userRoutes);
router.use('/review', reviewRoutes);
router.use('/favourites', favouriteRoutes)

module.exports = router;
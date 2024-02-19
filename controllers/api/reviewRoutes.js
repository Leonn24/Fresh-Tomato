const express = require('express');
const router = express.Router();
const { Review, Movie, User } = require('../../models');

router.post('/:movieId', async (req, res) => {
   const movieId = req.params.movieId

    try {

        const newReview = Review.create({
            include: [
                {
                    model: Movie, 
                    attributes: ['id']
                    
                },
                {
                    model: User,
                    attributes: ['id']
                }
            ],
            movie_review: req.body.review,
            movie_id: movieId,  
            user_id: req.session.user_id
        });
        console.log('Review inserted successfully');
        res.status(200).send('Review inserted successfully');
    } catch (error) {
        console.error('Error inserting review:', error);
        res.status(500).send('Error inserting review');
    }
});



router.get('/', async (req, res) => {
    try {
        // Fetch movies with their associated reviews
        const movies = await Review.findAll({ include: { model: User, as: 'user' } });

        // Calculate average rating for each movie
        const moviesWithAverageRating = movies.map(movie => {
            const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / (movie.reviews.length || 1); // Prevent division by zero

            return {
                id: movie.id,
                title: movie.title,
                // ... other movie fields
                averageRating: averageRating.toFixed(2), // Optional: Round to 2 decimal places
            };
        });

        res.json(moviesWithAverageRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const reviews = await Review.All({
        where: { user_id: userId },
        include: [{ model: Movie, as: 'movie' }],
      });
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;


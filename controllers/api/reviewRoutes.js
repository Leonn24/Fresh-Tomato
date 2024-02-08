const express = require('express');
const router = express.Router();

const { Review, Movie } = require('../../models');

router.get('/', async (req, res) => {
    try {
        // Fetch movies with their associated reviews
        const movies = await Movie.findAll({ include: { model: Review, as: 'reviews' } });

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

router.post('/', async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        await pool
        // Calculate the average rating for the movie
        const movieId = req.body.movieId;
        const movie = await Movie.findByPk(movieId, { include: Review });

        const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / (movie.reviews.length || 1); // Prevent division by zero

        // Update the movie's overall rating
        await Movie.update({ rating: averageRating.toFixed(2) }, { where: { id: movieId } });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    const reviewId = req.params.id;

    try {
        const reviewToDelete = await Review.findByPk(reviewId);

        if (!reviewToDelete) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Fetch the movie associated with the review
        const movieId = reviewToDelete.movieId;
        const movie = await Movie.findByPk(movieId, { include: Review });

        // Calculate the average rating after deleting the review
        const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / (movie.reviews.length - 1 || 1); // Prevent division by zero

        // Update the movie's overall rating
        await Movie.update({ rating: averageRating.toFixed(2) }, { where: { id: movieId } });

        await reviewToDelete.destroy();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


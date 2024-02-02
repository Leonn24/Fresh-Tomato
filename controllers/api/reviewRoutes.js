const express = require('express');
const router = express.Router();

const { Review, Movie } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({ include: Movie });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
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

      await reviewToDelete.destroy();
  
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;

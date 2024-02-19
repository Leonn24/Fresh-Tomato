const { Favourite } = require('../../models');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

  try {
    Favourite.create({
      imdb_id: req.body.movieId,
      favourite_user_id: req.session.user_id
    })
    res.status(200).json({ error: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.delete('/:movieId', async (req, res) => {

  try {
    Favourite.destroy({
      where: {
      imdb_id: req.params.movieId,
      favourite_user_id: req.session.user_id
    }})
    res.status(200).json({ error: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
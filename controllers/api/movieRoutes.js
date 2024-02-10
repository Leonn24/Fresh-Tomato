// const express = require('express');
// const router = express.Router();
// const { Movie } = require('../../models');

// router.post('/', async (req, res) => {
//   try {
//     const existingMovie = await Movie.findOne({ where: { imdb_id: req.body.imdb_id } });
//     if (!existingMovie) {
//       const newMovie = await Movie.create(req.body);
//       console.log(req.body);
//       res.status(200).json(newMovie);
//     } else {
//       res.status(200).json(existingMovie);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const movies = await Movie.findAll();
//     res.json(movies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




// GET route for single movie by ID
// router.get('/:id', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movie = await Movie.findByPk(movieId);

//     if (!movie) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }

//     res.json(movie);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// router.put('/:id', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movieToUpdate = await Movie.findByPk(movieId);

//     if (!movieToUpdate) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }


//     await movieToUpdate.update(req.body);

//     res.json({ message: 'Movie updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })
// router.delete('/:id', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movieToDelete = await Movie.findByPk(movieId);

//     if (!movieToDelete) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }


//     await movieToDelete.destroy();

//     res.json({ message: 'Movie deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

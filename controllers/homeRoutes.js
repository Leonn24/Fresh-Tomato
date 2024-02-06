const router = require('express').Router();
const { Movie, Review, User } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=06bd5d86a4a2e284a00d4ca47ecaf34b';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmJkNWQ4NmE0YTJlMjg0YTAwZDRjYTQ3ZWNhZjM0YiIsInN1YiI6IjY1YmM0YWQ4MTFjMDY2MDBlNWNmMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bkko_zrGBZFmzOkns4vFcTMo35_XlsA40CnpzTnoS5M'
            }
        };
        const response = await fetch(url, options);
        const json = await response.json();
        const movies = json.results.map(movie => ({
            title: movie.title,
            overview: movie.overview,
            poster: movie.poster_path,
            release: movie.release_date,
            id: movie.id
        }));
        console.log(movies)
        res.render('homepage', {
            movies,
            logged_in: req.session.logged_in
        });
    } catch (err) {
       
    }
});


router.get('/movie/:id', async (req, res) => {
    try {
        const movieData = await Movie.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const movie = movieData.get({ plain: true });

        res.render('movie', {
            ...movie,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/profile', withAuth, async (req, res) => {
    try {

        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Movie }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
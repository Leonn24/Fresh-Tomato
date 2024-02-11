const router = require("express").Router();
const { Movie, Review, User, Favourite } = require("../models");
const withAuth = require("../utils/auth");
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=06bd5d86a4a2e284a00d4ca47ecaf34b";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmJkNWQ4NmE0YTJlMjg0YTAwZDRjYTQ3ZWNhZjM0YiIsInN1YiI6IjY1YmM0YWQ4MTFjMDY2MDBlNWNmMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bkko_zrGBZFmzOkns4vFcTMo35_XlsA40CnpzTnoS5M",
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    const movies = json.results.map((movie) => ({
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      release: movie.release_date,
      id: movie.id,
    }));
    res.render("homepage", {
      movies,
      logged_in: req.session.logged_in,
    });
  } catch (err) {}
});

router.get("/movie/search/:movie", async (req, res) => {
  try {
    const movieName = req.params.movie;
    const apiKey = "8828c04b";
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    const data = json;

    const movie = {
      title: data.Title,
      genre: data.Genre,
      actors: data.Actors,
      plot: data.Plot,
      released: data.Released,
      poster: data.Poster,
      imdb_rating: data.imdbRating,
      imdb_id: data.imdbID,
    };
    try {
      const existingMovie = await Movie.findOne({
        where: { imdb_id: movie.imdb_id },
      });
      const favourites = await getFavourites(req.session.user_id);

      if (!Array.isArray(favourites)) {
        res.status(500).json({ error: "Internal Server Error" });
      }

      if (!existingMovie) {
        const newMovie = await Movie.create(movie);
        res.render("movie", {
          ...newMovie.dataValues,
          favourites: favourites ? favourites : [],
          logged_in: req.session.logged_in,
        });
      } else {
        res.render("movie", {
          ...existingMovie.dataValues,
          favourites: favourites ? favourites : [],
          logged_in: req.session.logged_in,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const movie = movieData.get({ plain: true });
    res.render("movie", {
      ...movie,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User, Movie],
    });

    const userReviews = reviewData.map((review) => review.get({ plain: true }));

    res.render("profile", {
      userReviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

router.get("/favourites", async (req, res) => {
  try {
    const favourites = await createMovieFromList(await getFavourites(req.session.user_id))
    res.render("favourites", {
      favourites: favourites,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getFavourites = async (userId) => {
  try {
    const favourites = await Favourite.findAll({
      where: {
        favourite_user_id: userId,
      },
    });
    
    return favourites.map((favourite) => favourite.dataValues);
  } catch (error) {
    return error;
  }
};

const createMovieFromList = async (favourites) => {
    return Promise.all(favourites.map(async (fav) => await getMovieFromImdb(fav.imdb_id)))
}

const getMovieFromImdb = async (movieId) => {
    const url =
      `https://api.themoviedb.org/3/find/${movieId}?external_source=imdb_id&api_key=06bd5d86a4a2e284a00d4ca47ecaf34b`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmJkNWQ4NmE0YTJlMjg0YTAwZDRjYTQ3ZWNhZjM0YiIsInN1YiI6IjY1YmM0YWQ4MTFjMDY2MDBlNWNmMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bkko_zrGBZFmzOkns4vFcTMo35_XlsA40CnpzTnoS5M",
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    const movie = json.movie_results.map((movie) => ({
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      release: movie.release_date,
      id: movie.id,
    }));

    return movie[0];
}

module.exports = router;

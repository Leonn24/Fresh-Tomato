const express = require('express');
const fetch = require('node-fetch');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: false }));
app.set('view engine', 'hbs');

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=06bd5d86a4a2e284a00d4ca47ecaf34b';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmJkNWQ4NmE0YTJlMjg0YTAwZDRjYTQ3ZWNhZjM0YiIsInN1YiI6IjY1YmM0YWQ4MTFjMDY2MDBlNWNmMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bkko_zrGBZFmzOkns4vFcTMo35_XlsA40CnpzTnoS5M'
  }
};

app.get('/', async (req, res) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const movies = json.results.map(movie => ({
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      release: movie.release_date,
      id: movie.id
    }));
    console.log(movies);
    res.render('template', { movies });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    res.render('template', { movies: [] });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});







const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=06bd5d86a4a2e284a00d4ca47ecaf34b';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmJkNWQ4NmE0YTJlMjg0YTAwZDRjYTQ3ZWNhZjM0YiIsInN1YiI6IjY1YmM0YWQ4MTFjMDY2MDBlNWNmMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bkko_zrGBZFmzOkns4vFcTMo35_XlsA40CnpzTnoS5M'
//   }
// };

// app.get('/', async (req, res) => {
//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();
//     const movies = json.results.map(movie => ({
//       title: movie.title,
//       overview: movie.overview,
//       poster: movie.poster_path,
//       release: movie.release_date,
//       id: movie.id
//     }));
//     console.log(movies);
//     res.render('homepage', { movies });
//   } catch (error) {
//     console.error('Error fetching trending movies:', error);
//     res.render('homepage', { movies: [] });
//   }
// });


// app.get('/', (req, res) => {
//   res.render('homepage', {msg:'welcome to fresh tomato'})
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

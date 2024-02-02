async function getMovieInfo(movieName) {
    const apiKey = '8828c04b';
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        return {
          title: data.Title,
          genre: data.Genre,
          actors: data.Actors,
          plot: data.Plot,
          released: data.Released,
          poster: data.Poster,
          imdbRating: data.imdbRating,
          imdbID: data.imdbID
        };
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      console.error('Error fetching movie information:', error.message);
      return null;
    }
  }
  
  getMovieInfo('ted').then((movie) => {
    if (movie) {
      console.log(
        `Title: ${movie.title}, Genre: ${movie.genre}, Actors: ${movie.actors}, Plot: ${movie.plot}, Released: ${movie.released}, Poster: ${movie.poster}, IMDB Rating: ${movie.imdbRating}, IMDBID: ${movie.imdbID}`
      );
    }
  });

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

  const movieSearchForm = document.getElementById('movie-search-form');
  const movieNameInput = document.getElementById('movie-name');
  const movieInfoDiv = document.getElementById('movie-info');

  movieSearchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const movieName = movieNameInput.value.trim();
    const movie = await getMovieInfo(movieName)

    if (movie) {
      movieInfoDiv.innerHTML= `
      <h2>${movie.title}</h2>
      <p>Genre: ${movie.genre}</p>
      <p>Actors: ${movie.actors}</p>
      <p>Plot: ${movie.plot}</p>
      <p>Released: ${movie.released}</p>
      <img src="${movie.poster}" alt="${movie.title} poster">
      <p>IMDB Rating: ${movie.imdbRating}</p>
      <p>IMDBID: ${movie.imdbID}</p>
      `;
    } else {
      movieInfoDiv.textContent = 'Error'
      console.log('error')
    }
  });
  


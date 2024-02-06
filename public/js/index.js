async function getMovieInfo(movieName) {
  const url = `http://localhost:3001/movie/search?movieName=${movieName}`;
  
    try {
      const response = await fetch(url);
      await response.json();
  
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
  


const axios = require('axios');

// Function to fetch trending movies from the API
const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=06bd5d86a4a2e284a00d4ca47ecaf34b');
    return response.data.results; // Assuming the API response contains a results array of movies
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return []; // Return an empty array in case of error
  }
};

module.exports = { fetchTrendingMovies };
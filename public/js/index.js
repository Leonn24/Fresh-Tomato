document.getElementById('movie-search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const movieName = document.getElementById('movie-name').value.trim();
    window.location.replace(`/movie/search/${movieName}`)
})


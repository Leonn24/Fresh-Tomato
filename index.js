
async function getMovie() {
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8828c04b`)
    const movie = await response.json();
    console.log(movie.Title);
    console.log(movie.Genre);
    console.log(movie.Actors);
    console.log(movie.Plot);
    console.log(movie.Released);
    console.log(movie.Poster);
    console.log(movie.imdbRating);
}
(async () => {
    await getMovie();
});


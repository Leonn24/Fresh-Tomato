function getMovie() {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8828c04b`)
    return response.json();
}
console.log(response)
//         .then(function (response) {
//     return response.json();
// })
// console.log(response)
// var response = [];

// // for (var i = 0; i < response.list; i++) {
//     var listItem = response.list;

//     var movieData = {
//         title: listItem.Title,
//         genre: listItem.Genre,
//         actors: listItem.Actors,
//         plot: listItem.Plot,
//         date: listItem.Released,
//         poster: listItem.Poster,
//         rating: listItem.imdbRating
//     };
//     console.log(movieData)
// }


// }

getMovie();
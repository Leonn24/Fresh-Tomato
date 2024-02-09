const submitReviewHandler = async ( event, movieId) => {
    event.preventDefault();
    
    //  console.log(JSON.parse(sessionStorage.getItem("user")).id);
      const response = await fetch(`/api/review/${JSON.parse(sessionStorage.getItem("user")).id}/${movieId}`, {
        method: 'POST',
        body: JSON.stringify({ review: document.querySelector('input[name="rating"]:checked').value }),
        headers: { 'Content-Type': 'application/json' },
      });
    }


//     document
//   .querySelector('.review-movie')
//   .addEventListener('submit', (movieId) => submitReviewHandler(movieId))
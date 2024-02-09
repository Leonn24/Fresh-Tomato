const submitReviewHandler = async (event) => {
    event.preventDefault();

    const movieId = document.querySelector('.movieId').value
    
    //  console.log(JSON.parse(sessionStorage.getItem("user")).id);
      const response = await fetch(`/api/review/${movieId}`, {
        method: 'POST',
        body: JSON.stringify({ 
          review: document.querySelector('input[name="rating"]:checked').value 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

    }


    document
  .querySelector('.review-movie')
  .addEventListener('submit', submitReviewHandler)
const checkFavExist = () => {
  const favouritesList = document.getElementsByClassName(
    "existing-favourite-movie-id"
  );

  const favourites = []
  
  Array.prototype.forEach.call(favouritesList, (fav) => favourites.push(fav.value));
  
  if (favourites === undefined) {
    return false;
  }

  return favourites.includes(
    document.getElementById("movie-id").value);
} 

const doesFavExist = checkFavExist()

if (doesFavExist) {
  document.getElementById("favourites-button").innerHTML =
    "Remove from favourites";
}

const onFavouriteClick = async (event) => {
  event.preventDefault();

  if (!doesFavExist) {
    const response = await fetch("/api/favourites", {
      method: "POST",
      body: JSON.stringify({
        movieId: document.getElementById("movie-id").value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("Added to favourites");
      location.reload();
    } else {
      alert(response.statusText);
    }
  } else {
    const response = await fetch(
      `/api/favourites/${document.getElementById("movie-id").value}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("Removed to favourites");
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".favourite-form")
  .addEventListener("submit", onFavouriteClick);

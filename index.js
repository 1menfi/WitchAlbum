function validateForm(event) {
  const numSongs = parseInt(document.getElementById("number-songs").value);
  const errorMessage = document.getElementById("error-message");

  if (isNaN(numSongs) || numSongs <= 0) {
    // Display an error message or perform any necessary action
    errorMessage.textContent = "Please enter a valid number of songs.";
    errorMessage.classList.remove("hidden");
    event.preventDefault(); // Prevent form submission
    return false;
  }

  // Hide the error message when a valid value is entered
  errorMessage.classList.add("hidden");

  // If the number of songs is valid, call the storeData function
  storeData(event);
  return true;
}

function storeData(event) {
  event.preventDefault();

  const albumName = document.getElementById("album-name").value;
  const artistName = document.getElementById("artist-name").value;
  const releaseYear = document.getElementById("release-year").value;
  const genre = document.getElementById("genre").value;
  const numSongs = parseInt(document.getElementById("number-songs").value);

  document.getElementById("album-name-display").textContent = albumName;
  document.getElementById("artist-name-display").textContent = artistName;
  document.getElementById("release-year-display").textContent = releaseYear;
  document.getElementById("genre-display").textContent = genre;

  document.getElementById("album-info-form").classList.add("hidden");
  document.getElementById("album-rating").classList.remove("hidden");

  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = "";

  for (let i = 1; i <= numSongs; i++) {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-rating-item");
    songDiv.innerHTML = `
      <p>song ${i}</p>
      <input type="number" class="song-rating-slider" min="0" max="10" step="1">
    `;
    songContainer.appendChild(songDiv);
  }
}

const ratingSliders = document.querySelectorAll(".song-rating-slider");
const errorMessage = document.getElementById("error-message");
const submitRatingButton = document.getElementById("submit-rating");

ratingSliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    const value = parseInt(slider.value);

    if (isNaN(value) || value < 0 || value > 10) {
      errorMessage.classList.remove("hidden");
    } else {
      errorMessage.classList.add("hidden");
    }

    // Check if any slider value is valid, if so, hide the error message
    const anyValid = Array.from(ratingSliders).some(
      (slider) =>
        !isNaN(parseInt(slider.value)) &&
        parseInt(slider.value) >= 0 &&
        parseInt(slider.value) <= 10
    );
    if (anyValid) {
      errorMessage.classList.add("hidden");
    }
  });
});

submitRatingButton.addEventListener("click", () => {
  const ratingSliders = document.querySelectorAll(".song-rating-slider");
  let totalRating = 0;
  let validRatingsCount = 0; // To keep track of valid ratings
  let hasInvalidRating = false; // Flag to track if there's an invalid rating

  ratingSliders.forEach((slider) => {
    let rating = parseInt(slider.value);
    if (!isNaN(rating) && rating >= 0 && rating <= 10) {
      totalRating += rating;
      validRatingsCount++;
    } else {
      // Handle invalid rating (optional)
      // For example, you might display a message to the user
      // or reset the value to the nearest valid value
      if (rating > 10) {
        rating = null; // Set the value to the maximum (10) if it's greater than 10
      } else {
        rating = 0; // Set the value to the minimum (0) if it's less than 0
      }
      slider.value = rating;
      errorMessage.classList.remove("hidden"); // Display error message for invalid rating
      hasInvalidRating = true; // Set the flag to true
    }
  });

  if (hasInvalidRating || validRatingsCount === 0) {
    // Handle case when invalid or no valid ratings were provided
    // For example, you might display a message to the user
    errorMessage.classList.remove("hidden");
    return;
  } else {
    // Hide the error message when all ratings are valid
    errorMessage.classList.add("hidden");
  }

  const finalRating = (totalRating / validRatingsCount).toFixed(2);
  document.getElementById("song-container").classList.add("hidden");
  document.getElementById("final-rating").classList.remove("hidden");
  document.getElementById("final-rating-value").textContent = finalRating;
});

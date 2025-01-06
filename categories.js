const url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'facf05d2a1msh10079e5138d281ap141a75jsn65752110123b',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com',
  },
};

let allMovies = [];
let cachedMovies = {};

async function fetchCategoryData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    allMovies = result;
  } catch (error) {
    console.error('Något fel inträffade', error);
  }
}

function renderCategoryMovies(movies) {
  const movieArea = document.getElementById('movieArea');
  movieArea.innerHTML = '';

  movies.forEach((movie) => {
    const {
      title,
      startYear,
      primaryImage,
      averageRating,
      url,
      duration,
      description,
    } = movie;

    const newDiv = document.createElement('div');
    newDiv.classList.add('movieItem');

    const newTitle = document.createElement('h2');
    newTitle.textContent = title;
    newDiv.appendChild(newTitle);

    const movieImg = document.createElement('img');
    movieImg.src = primaryImage;
    movieImg.alt = `${title} poster`;
    newDiv.appendChild(movieImg);

    newDiv.addEventListener('click', () => {
      showMovieDetails(
        title,
        primaryImage,
        description,
        averageRating,
        startYear,
        url
      );
    });

    movieArea.appendChild(newDiv);
  });
}

function showMovieDetails(title, image, description, rating, year, imdbUrl) {
  const modal = document.getElementById('movieModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalRating = document.getElementById('modalRating');
  const modalYear = document.getElementById('modalYear');
  const modalLink = document.getElementById('modalLink');

  modalTitle.textContent = title;
  modalImage.src = image;
  modalDescription.textContent = description;
  modalRating.textContent = rating;
  modalYear.textContent = year;
  modalLink.href = imdbUrl;

  // Show the modal
  modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('movieModal').style.display = 'none';
});

// Close the modal if clicked outside the modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('movieModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function handleCategoryClick(category) {
  // Hide the video when a category is selected
  const videoWrapper = document.getElementById('videoWrapper');
  videoWrapper.style.display = 'none'; // Hide video

  if (cachedMovies[category]) {
    renderCategoryMovies(cachedMovies[category]); // Display cached movies if available
    return;
  }

  let moviesToDisplay = [];

  if (category === 'topRated') {
    moviesToDisplay = allMovies
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 10);
  }

  if (category === 'oldest') {
    moviesToDisplay = allMovies
      .sort((a, b) => a.startYear - b.startYear)
      .slice(0, 10);
  }

  if (category === 'longest') {
    moviesToDisplay = allMovies
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);
  }

  if (category === 'mostVoted') {
    moviesToDisplay = allMovies
      .sort((a, b) => b.numVotes - a.numVotes)
      .slice(0, 10);
  }

  cachedMovies[category] = moviesToDisplay;
  renderCategoryMovies(moviesToDisplay);
}

function resetVideoVisibility() {
  const videoWrapper = document.getElementById('videoWrapper');
  videoWrapper.style.display = 'block'; // Show the video again
}

// Call this function when the page loads or when no category is selected
resetVideoVisibility();

function searchMovies() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  renderCategoryMovies(filteredMovies);
}

document
  .getElementById('topRatedButton')
  .addEventListener('click', () => handleCategoryClick('topRated'));
document
  .getElementById('oldestButton')
  .addEventListener('click', () => handleCategoryClick('oldest'));
document
  .getElementById('longestButton')
  .addEventListener('click', () => handleCategoryClick('longest'));
document
  .getElementById('mostVotedButton')
  .addEventListener('click', () => handleCategoryClick('mostVoted'));

document.getElementById('searchButton').addEventListener('click', searchMovies);
document.getElementById('searchInput').addEventListener('input', searchMovies);

fetchCategoryData();
const footer = document.querySelector('footer');

// Function to toggle the footer visibility
function toggleFooterOnScroll() {
  if (window.scrollY > 50) {
    // Check if the user has scrolled down 50px
    footer.style.transform = 'translateY(0)';
    footer.style.opacity = '1';
  } else {
    footer.style.transform = 'translateY(100%)';
    footer.style.opacity = '0';
  }
}

// Add a scroll event listener
window.addEventListener('scroll', toggleFooterOnScroll);

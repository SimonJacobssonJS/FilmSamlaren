const url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'facf05d2a1msh10079e5138d281ap141a75jsn65752110123b',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com',
  },
};

let allMovies = [];

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    allMovies = result;
    console.log(result);
    renderMovies(allMovies);
  } catch (error) {
    console.error('Något fel inträffade', error);
  }
}

// Fisher-Yates shuffle function to randomize the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderMovies(moviesToRender) {
  const movieArea = document.getElementById('movieArea');
  movieArea.innerHTML = '';

  const shuffledMovies = shuffleArray(moviesToRender);

  shuffledMovies.forEach((movie) => {
    const { title, startYear, primaryImage, description, averageRating, url } =
      movie;

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
  modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('movieModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
  const modal = document.getElementById('movieModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function searchMovies() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  renderMovies(filteredMovies);
}

document.getElementById('searchButton').addEventListener('click', searchMovies);
document.getElementById('searchInput').addEventListener('input', searchMovies);

fetchData();

// Select the footer element
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

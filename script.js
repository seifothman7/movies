const movieCards = Array.from(document.querySelectorAll(".movie-card"));
const movieContainer = document.getElementById("movieContainer");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const searchBox = document.getElementById("searchBox");

let currentPage = 1;
const cardsPerPage = 2;
let totalPages = Math.ceil(movieCards.length / cardsPerPage);

function showPage(page) {
    // Hide all movie cards
    movieCards.forEach(card => card.style.display = "none");

    // Calculate start and end indices for the current page
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Show the cards for the current page
    movieCards.slice(start, end).forEach(card => card.style.display = "block");

    // Enable or disable buttons based on the page
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
}

// Go to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Go to the next page
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

// Filter movies based on search query
function filterMovies() {
    const query = searchBox.value.toLowerCase();
    
    // Filter movie cards based on title and recalculate pagination
    movieCards.forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });

    // Update visible cards after filtering and reset pagination
    const visibleCards = movieCards.filter(card => card.style.display === "block");
    totalPages = Math.ceil(visibleCards.length / cardsPerPage);
    currentPage = 1; // Reset to first page
    showPage(currentPage);
}

// Initialize the first page
showPage(currentPage);

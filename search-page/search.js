// Sticky Navbar Functionality
window.onscroll = function() {
    let nav = document.querySelector(".navbar"); // Selecting the navbar
    if (document.documentElement.scrollTop > 5 || document.body.scrollTop > 5) {
        nav.classList.add("sticky"); // Adding sticky class when scrolling
    } else {
        nav.classList.remove("sticky"); // Removing sticky class when not scrolling
    }
};

// Selecting all navigation links
const navLinks = document.querySelectorAll('.navbar a');

// Getting the current URL
const currentURL = window.location.href;

// Iterating over each link
navLinks.forEach(link => {
    // If the link's href matches the current URL, adding the active class
    if (link.href === currentURL) {
        link.classList.add('active'); // Adding active class to the current link
    }
});

// Constants for the API URL
const API_URL = 'http://localhost:3000/api/search';

// Local mapping of fundraiser images
const fundraiserImages = {
    1: '../Images/Medical Aid for Children.jpg',  // Mapping fundraiser ID 1
    2: '../Images/Football Equipment for Youth.jpg',  // Mapping fundraiser ID 2
    3: '../Images/Help for Abandoned Dogs.jpg',  // Mapping fundraiser ID 3
    4: '../Images/Cancer Treatment for Sarah.jpg',  // Mapping fundraiser ID 4
    5: '../Images/Youth Sports Equipment Fund.jpg',  // Mapping fundraiser ID 5
    6: '../Images/Support Cancer Research.jpg',  // Mapping fundraiser ID 6
};

// Function to search fundraisers based on criteria
function searchFundraisers() {
    // Getting form values
    const organizer = document.getElementById('organizer').value; // Getting organizer value
    const city = document.getElementById('city').value; // Getting city value
    const category = document.getElementById('category').value; // Getting category value

    // Ensuring at least one criterion is filled
    if (!organizer && !city && !category) {
        alert("Please select at least one search criterion."); // Alerting user if no criterion is filled
        return;
    }

    // Building the query string
    const queryParams = new URLSearchParams();
    if (organizer) queryParams.append('organizer', organizer); // Appending organizer if filled
    if (city) queryParams.append('city', city); // Appending city if filled
    if (category) queryParams.append('category', category); // Appending category if filled

    // Fetching the fundraisers based on the search criteria
    fetch(`${API_URL}?${queryParams.toString()}`) // Fetching data from API
        .then(response => response.json()) // Parsing JSON response
        .then(data => displayResults(data)) // Displaying results if successful
        .catch(error => {
            console.error('Error fetching fundraisers:', error); // Logging error if fetch fails
            displayError('An error occurred while fetching fundraisers.'); // Displaying error message
        });
}

// Function to display the search results
function displayResults(fundraisers) {
    const resultsDiv = document.getElementById('results'); // Getting results div
    const errorDiv = document.getElementById('error'); // Getting error div

    // Clearing previous results and error messages
    resultsDiv.innerHTML = ''; // Clearing results
    errorDiv.textContent = ''; // Clearing error messages

    if (fundraisers.length === 0) {
        // Showing "no results" message in bold red
        errorDiv.textContent = 'No fundraisers found.'; // Setting no results message
        errorDiv.style.color = 'red'; // Setting color to red
        errorDiv.style.fontWeight = 'bold'; // Making text bold
    } else {
        // Mapping fundraisers to structured objects
        const activeFundraisers = fundraisers.map(fundraiser => ({
            id: fundraiser.FUNDRAISER_ID, // Getting fundraiser ID
            organizer: fundraiser.ORGANIZER, // Getting organizer
            caption: fundraiser.CAPTION, // Getting caption
            targetFunding: fundraiser.TARGET_FUNDING, // Getting target funding
            currentFunding: fundraiser.CURRENT_FUNDING, // Getting current funding
            city: fundraiser.CITY, // Getting city
            category: fundraiser.CATEGORY_NAME // Getting category name
        }));

        // Displaying the structured fundraisers
        activeFundraisers.forEach(fundraiser => {
            const progressPercentage = (parseFloat(fundraiser.currentFunding) / parseFloat(fundraiser.targetFunding)) * 100; // Calculating progress percentage

            const fundraiserCard = document.createElement('div'); // Creating fundraiser card element
            fundraiserCard.classList.add('fundraiser-card'); // Adding class to card

            // Using the local image URL from the JavaScript array
            const imageUrl = fundraiserImages[fundraiser.id] || './images/default.jpg'; // Fallback to default image if not found

            // Creating the anchor tag wrapping the entire card
            fundraiserCard.innerHTML = `
                <a href="../fundraiser-page/fundraiser.html?id=${fundraiser.id}" style="text-decoration: none; color: inherit;">
                    <div class="fundraiser-image">
                        <img src="${imageUrl}" alt="Image of ${fundraiser.caption}" style="width: 100%; height: 150px; object-fit: cover;">
                    </div>
                    <div class="fundraiser-info">
                        <h3>${fundraiser.caption}</h3>
                        <div class="fundraiser-progress">
                            <div class="fundraiser-progress-bar" style="width: ${progressPercentage}%"></div> <!-- Setting progress bar width -->
                        </div>
                        <p><strong>Progress:</strong> $${fundraiser.currentFunding} raised of $${fundraiser.targetFunding}</p>
                        <p><strong>Organizer:</strong> ${fundraiser.organizer}</p>
                        <p><strong>City:</strong> ${fundraiser.city}</p>
                        <p><strong>Category:</strong> ${fundraiser.category}</p>
                    </div>
                </a>
            `;

            resultsDiv.appendChild(fundraiserCard); // Appending fundraiser card to results div
        });
    }
}

// Function to display error message
function displayError(message) {
    const errorDiv = document.getElementById('error'); // Getting error div
    errorDiv.textContent = message; // Setting error message
    errorDiv.style.color = 'red'; // Setting color to red
    errorDiv.style.fontWeight = 'bold'; // Making text bold
}

// Function to clear form inputs and results
function clearCheckboxes() {
    document.getElementById('searchForm').reset(); // Resetting the form
    document.getElementById('results').innerHTML = ''; // Clearing results
    document.getElementById('error').textContent = ''; // Clearing error messages
}

// Adding event listener to the search button
document.getElementById('searchButton').addEventListener('click', searchFundraisers); // Listening for search button click

// Adding event listener to the clear button
document.getElementById('clearButton').addEventListener('click', clearCheckboxes); // Listening for clear button click

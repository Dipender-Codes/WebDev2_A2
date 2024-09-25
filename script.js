// Sticky Navbar Functionality
window.onscroll = function() {
    let nav = document.querySelector(".navbar"); // Selecting the navbar element
    // Checking if the page has been scrolled down
    if (document.documentElement.scrollTop > 5 || document.body.scrollTop > 5) {
        nav.classList.add("sticky"); // Adding sticky class to navbar when scrolled
    } else {
        nav.classList.remove("sticky"); // Removing sticky class when at the top
    }
};

// Getting the inspiring story container
const inspiringStoryContainer = document.querySelector('.inspiring-story-container'); // Select the inspiring story container

// Adding event listener for hover
inspiringStoryContainer.addEventListener('mouseover', () => {
    // Adding class to expand the container to full screen on mouseover
    inspiringStoryContainer.classList.add('expanded');
});

// Adding event listener for mouse out
inspiringStoryContainer.addEventListener('mouseout', () => {
    // Removing class to collapse the container to mid screen on mouse out
    inspiringStoryContainer.classList.remove('expanded');
});

// Selecting all navigation links
const navLinks = document.querySelectorAll('.navbar a'); // Getting all anchor tags in the navbar

// Getting the current URL
const currentURL = window.location.href; // Getting the current page URL

// Iterating over each link
navLinks.forEach(link => {
    // If the link's href matches the current URL, adding the active class
    if (link.href === currentURL) {
        link.classList.add('active'); // Adding active class to highlight the current page link
    }
});


// Object to store fundraiser images with IDs as keys
const fundraiserImages = {
    1: './Images/Medical Aid for Children.jpg',  // Image for fundraiser ID 1
    2: './Images/Football Equipment for Youth.jpg',  // Image for fundraiser ID 2
    3: './Images/Help for Abandoned Dogs.jpg',  // Image for fundraiser ID 3
    4: './Images/Cancer Treatment for Sarah.jpg',  // Image for fundraiser ID 4
    5: './Images/Youth Sports Equipment Fund.jpg',  // Image for fundraiser ID 5
    6: './Images/Support Cancer Research.jpg',  // Image for fundraiser ID 6
};

// Function to fetch active fundraisers from the API
async function fetchActiveFundraisers() {
    try {
        const response = await fetch('http://localhost:3000/api/fundraisers'); // Fetching active fundraisers from API
        
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText); // Handling non-200 responses
        }

        const fundraisers = await response.json(); // Parsing the response as JSON

        // Storing fundraisers in local variables
        const activeFundraisers = fundraisers.map(fundraiser => ({
            id: fundraiser.FUNDRAISER_ID, // Storing fundraiser ID
            organizer: fundraiser.ORGANIZER, // Storing organizer name
            caption: fundraiser.CAPTION, // Storing fundraiser caption
            targetFunding: fundraiser.TARGET_FUNDING, // Storing target funding amount
            currentFunding: fundraiser.CURRENT_FUNDING, // Storing current funding amount
            city: fundraiser.CITY, // Storing city
            category: fundraiser.CATEGORY_NAME // Storing category name
        }));

        // Displaying fundraisers
        displayFundraisers(activeFundraisers); // Calling display function with active fundraisers
    } catch (error) {
        console.error('Error fetching fundraisers:', error); // Logging any errors encountered
    }
}

// Function to fetch and display fundraisers
function displayFundraisers(fundraisers) {
    const fundraiserList = document.querySelector('.fundraisers-list'); // Selecting the list container for fundraisers
    fundraiserList.innerHTML = ''; // Clearing previous content

    fundraisers.forEach(fundraiser => {
        const progressPercentage = (parseFloat(fundraiser.currentFunding) / parseFloat(fundraiser.targetFunding)) * 100; // Calculate progress percentage

        const fundraiserItem = document.createElement('div'); // Creating a new div for the fundraiser card
        fundraiserItem.classList.add('fundraiser-card'); // Adding class for styling
        
        // Using the local image URL from the JavaScript array or fallback to a default image
        const imageUrl = fundraiserImages[fundraiser.id] || './images/default.jpg'; 

        // Setting inner HTML for the fundraiser card
        fundraiserItem.innerHTML = `
            <div class="fundraiser-image">
                <img src="${imageUrl}" alt="Image of ${fundraiser.caption}" style="width: 100%; height: 150px; object-fit: cover;"> <!-- Fundraiser image -->
            </div>
            <div class="fundraiser-info">
                <h3>${fundraiser.caption}</h3> <!-- Fundraiser caption -->
                <p><strong>Organizer:</strong> ${fundraiser.organizer}</p> <!-- Organizer information -->
                <p><strong>Category:</strong> ${fundraiser.category}</p> <!-- Category information -->
                <p><strong>Location:</strong> ${fundraiser.city}</p> <!-- Location information -->
                <div class="fundraiser-progress">
                    <div class="fundraiser-progress-bar" style="width: ${progressPercentage}%"></div> <!-- Progress bar filling -->
                </div>
                <p><strong>Progress:</strong> $${fundraiser.currentFunding} raised of $${fundraiser.targetFunding}</p> <!-- Funding progress -->
            </div>
        `;
        fundraiserList.appendChild(fundraiserItem); // Appending the fundraiser card to the list
    });
}

// Fetching the active fundraisers when the page loads
document.addEventListener('DOMContentLoaded', fetchActiveFundraisers); // Event listener for DOM content loaded

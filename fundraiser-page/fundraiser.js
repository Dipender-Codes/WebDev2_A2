// Sticky Navbar Functionality
window.onscroll = function() {
    let nav = document.querySelector(".navbar"); // Selecting the navbar element
    // Checking if the page has been scrolled more than 5 pixels
    if (document.documentElement.scrollTop > 5 || document.body.scrollTop > 5) {
        nav.classList.add("sticky"); // Adding 'sticky' class to the navbar
    } else {
        nav.classList.remove("sticky"); // Removing 'sticky' class from the navbar
    }
};

// Selecting all navigation links
const navLinks = document.querySelectorAll('.navbar a'); // Selecting all anchor tags within the navbar
const currentURL = window.location.href; // Getting the current URL

// Adding active class to current link
navLinks.forEach(link => {
    if (link.href === currentURL) {
        link.classList.add('active'); // Adding 'active' class to the current link
    }
});

// Storing short descriptions in an object
const descriptions = {
    1: "Medical Aid for Children by Dipender Raj Pandey seeks to raise $50,000 for medical supplies and treatments. Currently, $15,000 has been raised. This initiative aims to provide essential healthcare to children in need in Sydney, ensuring they receive the medical attention they deserve.",
    2: "Football Equipment for Youth organized by Nathan Cowie aims to gather $10,000 for providing youth in Brisbane with essential football gear. As of now, $2,500 has been raised. This initiative promotes sportsmanship and teamwork among young athletes, encouraging a healthy lifestyle through sports.",
    3: "Help for Abandoned Dogs by Breeza Robert is raising $15,000 to support the rescue and rehabilitation of abandoned dogs in Perth. Currently, $5,000 has been raised. This initiative focuses on giving these dogs a second chance at life, finding them loving homes.",
    4: "Cancer Treatment for Sarah, led by Zali Galvin, aims to raise $75,000 for Sarah’s cancer treatment. To date, $20,000 has been raised. This fundraiser seeks to ease the financial burden on Sarah’s family, ensuring she receives the necessary medical care in Tasmania.",
    5: "Youth Sports Equipment Fund, organized by Rishav Chauhan, aims to collect $20,000 for sports equipment for youth in San Francisco. So far, $5,000 has been raised. This initiative encourages young individuals to engage in sports, fostering teamwork and discipline.",
    6: "Support Cancer Research, organized by Dan Murphy, seeks to raise $100,000 for ongoing cancer research initiatives in New York. Currently, $30,000 has been raised. This effort aims to contribute to innovative treatments and support those affected by cancer through research and awareness."
};

// API URL
const API_URL = 'http://localhost:3000/api/fundraiser/'; // Defining the API URL

// Function to get query string parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search); // Creating a URLSearchParams object
    return urlParams.get(param); // Returning the value of the specified parameter
}

// Function to generate a short description
function generateShortDescription(fundraiser) {
    return `${fundraiser.CAPTION} by ${fundraiser.ORGANIZER} aims to raise $${fundraiser.TARGET_FUNDING}. Currently, $${fundraiser.CURRENT_FUNDING} has been raised.`; // Generating a short description
}

// Fetch fundraiser details based on the ID from the query string
async function fetchFundraiserDetails(fundraiserId) {
    try {
        const response = await fetch(`${API_URL}${fundraiserId}`); // Fetching fundraiser details from the API
        if (!response.ok) {
            throw new Error('Failed to fetch fundraiser details'); // Throwing error if response is not OK
        }

        const fundraiser = await response.json(); // Parsing the response as JSON

        // Storing values in local variables with fallback defaults
        const title = fundraiser.CAPTION || 'No Title Available'; // Getting title with fallback
        const organizer = fundraiser.ORGANIZER || 'No Organizer Available'; // Getting organizer with fallback
        const category = fundraiser.CATEGORY_NAME || 'No Category Available'; // Getting category with fallback
        const city = fundraiser.CITY || 'No City Available'; // Getting city with fallback
        const goalAmount = fundraiser.TARGET_FUNDING || '0'; // Getting goal amount with fallback
        const raisedAmount = fundraiser.CURRENT_FUNDING || '0'; // Getting raised amount with fallback

        const description = descriptions[fundraiser.FUNDRAISER_ID] || 'No Description Available'; // Getting description based on ID
        // Displaying the fundraiser details
        displayFundraiserDetails(title, organizer, category, city, description, goalAmount, raisedAmount);
    } catch (error) {
        console.error('Error:', error); // Logging error to the console
        document.getElementById('fundraiser-details').innerHTML = '<p>Unable to load fundraiser details.</p>'; // Displaying error message
    }
}

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const fundraiserId = getQueryParam('id'); // Getting fundraiser ID from the query string
    if (fundraiserId) {
        fetchFundraiserDetails(fundraiserId); // Fetching fundraiser details if ID is available
    } else {
        document.getElementById('fundraiser-details').innerHTML = '<p> </p>'; 
    }
});

// Display fundraiser details on the page
function displayFundraiserDetails(title, organizer, category, city, description, goalAmount, raisedAmount) {
    const detailsContainer = document.getElementById('fundraiser-details'); // Selecting the details container
    
    // Generating short description
    const shortDescription = generateShortDescription({ title, organizer, goalAmount, raisedAmount });
    
    detailsContainer.innerHTML = `
        <h1>${title}</h1> <!-- Displaying the title -->
        <p><strong>Organizer:</strong> ${organizer}</p> <!-- Displaying the organizer -->
        <p><strong>Category:</strong> ${category}</p> <!-- Displaying the category -->
        <p><strong>City:</strong> ${city}</p> <!-- Displaying the city -->
        <p><strong>Goal Amount:</strong> $${goalAmount}</p> <!-- Displaying the goal amount -->
        <p><strong>Raised Amount:</strong> $${raisedAmount}</p> <!-- Displaying the raised amount -->
        <p><strong>Description:</strong> ${description}</p> <!-- Displaying the description -->
        <button id="donateButton" class="donate-button">Donate</button> <!-- Donate button -->
    `;

    // Adding event listener to "Donate" button
    const donateButton = detailsContainer.querySelector('#donateButton'); // Selecting the donate button
    if (donateButton) {
        donateButton.addEventListener('click', () => {
            alert('This feature is under construction.'); // Showing alert on button click
        });
    }
}



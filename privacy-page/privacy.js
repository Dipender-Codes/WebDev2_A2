// Sticky Navbar Functionality
window.onscroll = function() {
    // Selecting the navbar element
    let nav = document.querySelector(".navbar");
    
    // Checking if the user has scrolled more than 5 pixels
    if (document.documentElement.scrollTop > 5 || document.body.scrollTop > 5) {
        // Adding the 'sticky' class to the navbar if scrolled down
        nav.classList.add("sticky");
    } else {
        // Removing the 'sticky' class from the navbar if scrolled back up
        nav.classList.remove("sticky");
    }
};

// Selecting all navigation links within the navbar
const navLinks = document.querySelectorAll('.navbar a');

// Getting the current URL of the page
const currentURL = window.location.href;

// Iterating over each navigation link
navLinks.forEach(link => {
    // If the link's href attribute matches the current URL
    if (link.href === currentURL) {
        // Adding the 'active' class to highlight the current link
        link.classList.add('active');
    }
});

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/** 
*   TODO:
*       - Get all sections from the DOM and save them into an array or object
*       - The Nav Bar will create a <ul> from it
*       - The Nav Bar will have all sections listed and each element list will have a scroll event to move the viewport to it
*       - The Nav Bar content has to be added with the DocumentFragment for performance
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Navigation Bar build
 */
// Get all sections
const sections = document.getElementsByTagName('section');
// Create navigation list content fragment
let navListContent = document.createDocumentFragment();

for (const section of sections) {
    let navListElement = document.createElement('li');
    navListElement.textContent = section.dataset.nav;
    navListElement.className = "menu__link";
    navListContent.appendChild(navListElement);
}

const navList = document.getElementById("navbar__list");
navList.appendChild(navListContent);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



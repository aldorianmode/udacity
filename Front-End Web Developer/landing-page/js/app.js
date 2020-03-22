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
const header = document.querySelector('header.page__header');
const navList = document.getElementById("navbar__list");
const sections = document.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function getAllSectionsTopViewport() {
    const ret = [];
    for (const section of sections) {
        // Distance between section's top to viewport's top
        const sectionTopToViewport = section.getBoundingClientRect().top;
        // Offset = Nav. header's height
        const offset = header.getBoundingClientRect().height;
        ret.push(Math.abs(sectionTopToViewport - offset));
    }
    return ret;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Navigation Bar build
 */

// Create navigation list content fragment
let navListContent = document.createDocumentFragment();

for (const section of sections) {
    let navListElement = document.createElement('li');
    navListElement.textContent = section.dataset.nav;
    navListElement.className = "menu__link";
    // data-navlink used for scroll to section when clicked
    navListElement.setAttribute("data-navlink", section.id);
    navListContent.appendChild(navListElement);
}
navList.appendChild(navListContent);

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/
// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", event => {
    const allSectionsTopViewport = getAllSectionsTopViewport();
    const indexActiveSection = allSectionsTopViewport.indexOf(Math.min.apply(Math, allSectionsTopViewport));
    let index = 0;
    for(let section of sections) {
        if (index === indexActiveSection) {
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
        index++;
    };
});

// Scroll to section on link click
navList.addEventListener('click', (e) => {
    e.preventDefault();
    const clickedNavOption = e.target;
    const section = document.getElementById(clickedNavOption.dataset.navlink);
    section.scrollIntoView();
});



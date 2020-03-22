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
// Get absolute distances of all sections between viewport's top less the height of the navigation bar
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

function setNavSectionLinkState(sectionId, setActive) {
    const navLink = document.getElementById(`${sectionId}-link`);
    setActive ? navLink.classList.add('menu__active_link') : navLink.classList.remove('menu__active_link');
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
    let navListElementLink = document.createElement('a');
    navListElementLink.className = "menu__link";
    navListElementLink.setAttribute("id", `${section.id}-link`);
    navListElementLink.setAttribute("href", `#${section.id}`);
    navListElementLink.textContent = section.dataset.nav;
    // If scroll to sections is done with events, this attribute is used to know to whick element we must scroll in click
    // event callback
    //navListElementLink.setAttribute("data-navlink", section.id);
    navListElement.appendChild(navListElementLink);
    navListContent.appendChild(navListElement);
}
navList.appendChild(navListContent);

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
            setNavSectionLinkState(section.id, true);
        } else {
            section.classList.remove('your-active-class');
            setNavSectionLinkState(section.id, false);
        }
        index++;
    };
});

/*
// Nav bar scrolling to section using event
// Scroll to section on link click
navList.addEventListener('click', (e) => {
    const clickedNavOption = e.target;
    const section = document.getElementById(clickedNavOption.dataset.navlink);
    section.scrollIntoView();
});
*/


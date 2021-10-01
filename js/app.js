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
const navBarMenu = document.querySelector('.navbar__menu');
const divList = document.querySelectorAll('.landing__container');
const sectionList = document.querySelectorAll('section');

let count = 0;
let divCount = divList.length;
let sectionListArray = Array.from(sectionList);

// Generic helpers to identify if element is in view
// Very helpful tip from: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
// And some JS chops... probably not as efficient...
// Should look into this eventually: 
//  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
//  https://github.com/mrdanielschwarz/Intersection-Observer-API-demo/blob/main/script.js
const elemInView = function (elem) {
    const elemLoc = elem.getBoundingClientRect();
    const elemInView = [
        elemLoc.top >= 0,
        elemLoc.left >= 0,
        elemLoc.bottom <= (window.innerHeight || document.documentElement.clientHeight),
        elemLoc.right <= (window.innerWidth || document.documentElement.clientWidth)
    ]
    return !elemInView.includes(false);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// The div is there in the HTML. Let's populate it.
document.querySelectorAll("section").forEach(
    function (elem, idx, list) {
        const link = document.createElement('a');
        const correctIdx = idx + 1;
        link.setAttribute("href",'#' + elem.id);
        link.textContent = "Section " + correctIdx;
        navBarMenu.appendChild(link);
    }, 'burnerThisArg'
);

/**
 * End Main Functions
 * Begin Events
 * 
*/

//event listener that will set the active class based on what is in view
window.addEventListener('scroll', function(e) {
    for (const sectionElem of sectionListArray) {
        if (elemInView(sectionElem)) {
            // Add class 'active' to section when near top of viewport
            document.getElementById(sectionElem.id).className="your-active-class";
            let navSection = document.querySelectorAll("[href='#"+ sectionElem.id + "']");
            navSection.item(0).style.backgroundColor="cyan";
        } else {
            document.getElementById(sectionElem.id).className=null;
            let navSection = document.querySelectorAll("[href='#"+ sectionElem.id + "']");
            navSection.item(0).style.backgroundColor="white";
        }
    }
});
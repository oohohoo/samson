let burger = document.querySelector('.headerBar__burger');
let menuIsOpen = false; // tracks state

/* -----------------------------
// MENU IN ANIMATION
----------------------------- */

const menuIn = gsap.timeline({paused: true});

menuIn.fromTo('.menu', {opacity: 0, x: -150, y: 0}, 
    {duration: .5, opacity: 1, x: 0, y: 0 })

/* -----------------------------
// MENU OUT  ANIMATION
----------------------------- */

let menuOut = gsap.timeline({paused: true});

menuOut.to('.menu', {duration: .5, opacity: 0, y: -300})

// /* -----------------------------
// // ADD EVENT LISTER
// ----------------------------- */

burger.addEventListener('click', () => {
  menuIsOpen = !menuIsOpen; // toggle
  if (menuIsOpen) {
    menuIn.restart();
  } else {
    menuOut.restart();
  }
});

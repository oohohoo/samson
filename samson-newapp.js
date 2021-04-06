// OVA VERZIJA RADI BARBA

gsap.registerPlugin(ScrollTrigger);
console.log("ScrollTrigger Loaded!");

let locoScroll;
console.log("Locomotive Loaded");

Splitting();
console.log("Splitting Loaded");
/*
================================================================================
PRELOADER
================================================================================
*/

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loaderx');
const loaderInner = select('.inner-loader');
const progressBar = select('.progress');
const loaderMask = select('.loader__mask');

/*
================================================================================
IMAGES LOADED
================================================================================
*/

function init() {

  // show loader on page load
  gsap.set(loader, {autoAlpha: 1});

  // scale loader down
  gsap.set(loaderInner, {
    scaleY: 0.025,
    transformOrigin: 'bottom'
  });

  // make a tween that scales the loader
  const progressTween = gsap.to(progressBar, {
    paused: true,
    scaleX: 0,
    ease: 'none',
    transformOrigin: 'right'
  });

  // setup variables
  let loadedImageCount = 0,
    imageCount;
  const container = select('.smooth-scroll');

  // setup Images loaded
  const imgLoad = imagesLoaded(container);
  imageCount = imgLoad.images.length;

  // set the initial progress to 0
  updateProgress(0);

  // triggered after each item is loaded
  imgLoad.on('progress', function () {
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    updateProgress(loadedImageCount);
  });

  // update the progress of our progressBar tween
  function updateProgress(value) {
    // console.log(value/imageCount)
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
      progress: value / imageCount,
      duration: 0.3,
      ease: 'power1.out'
    })
  }

  // do whatever you want when all images are loaded
  imgLoad.on('done', function (instance) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, {
      autoAlpha: 0,
      onComplete: initPageTransitions
    });
  });

}

init();

/*
================================================================================
MAIN JS + LOCOMOTIVE SCROLL + SCROLL TRIGGER PROXY
================================================================================
*/
function initScroll(container) {

  locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    getDirection: true,
    scrollFromAnywhere: true,
    touchMultiplier: 3,
    // scrollbarContainer: document.querySelector('#primary'),
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,

    }
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

// data direction ubačeno naknadno
locoScroll.on('scroll', (instance) => {
    document.documentElement.setAttribute('data-direction', instance.direction)
});



  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
    // we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    // UKLJUČITI SAMO NA MOBILNOJ VERZIJI
    // pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });

  /* ===== 
  // Remove Old Locomotive Scrollbar.
  const scrollbar = document.querySelectorAll( '.c-scrollbar' );
      
  if ( scrollbar.length > 1 ) {
      scrollbar[0].remove();
  }
  /* ===== */

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  console.log("Scrolltrigger refreshed!");

  /* ===== */
/*   locoScroll.update();
  console.log("Locomotive Updated once more");; */



/* PREVENT SCROLL UNDER FS MENU*/

function handler1() {
   locoScroll.stop();
    $(this).one("click", handler2);
}

function handler2() {
   locoScroll.start();
    $(this).one("click", handler1);
}
$(".fs-nav-butt").one("click", handler1);

/*
  // When window reszie, need to update locomotive scroll.
  $( window ).on( 'resize', function() {
                  locoScroll.update();
                  ScrollTrigger.refresh();
                  console.log("JEBOTE RESIZED JEBOTE LOCOSCROLL I SCROLLTRIGGER UPDATED!");
} 


); 

*/
  /*
  ================================================================================
  SCROLLTRIGGER TEST
  ================================================================================
  */

/* ScrollTrigger.create({
  trigger: "#stickywrap",
  scroller: ".smooth-scroll",
  start: "top 20%",
  end:"bottom 80%",
pin: ".stop", 
 /*  onEnter: () => gsap.set('#sticky', {autoAlpha:1, rotate:45}),
  onLeaveBack: () => gsap.set('#sticky', {autoAlpha:0, rotate: 270}),
}); 
 */


/*  */
 /*
    gsap.utils.toArray('.pro-mask').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
         // markers: true,
          scroller: ".smooth-scroll",
          start: 'top 80%',
          end: "top top",
        },
        y: 200,
        opacity: 0
      })
    });
    console.log("Scrolltrigger animacija loaded");
  
*/

/* ScrollTrigger.create({
   scroller: ".smooth-scroll",
   markers: true,
  trigger: ".project-anchor",
  start: "top 10%", 
   end: "+=100%"
   //pin: "#pinny",
 
}); */
/* 
gsap.from(".line-2", {
  scrollTrigger: {
    trigger: ".orange",
    scroller: ".smooth-scroll",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%"
  },
  scaleX: 0, 
  transformOrigin: "left center", 
  ease: "none"
}); */


/*
================================================================================
LOCOMOTIVE 4 SCROLL TO TOP
================================================================================
*/
$( "#tomain" ).on( "click", function() {
  locoScroll.scrollTo( '#top', {
    'offset': 0,
    'duration': 1500,
    'easing': [0.25, 0.00, 0.35, 1.00],
    'disableLerp': true
  });
  
  
});
$( "#tomainipad" ).on( "click", function() {
  locoScroll.scrollTo( '#top', {
    'offset': 0,
    'duration': 1500,
    'easing': [0.25, 0.00, 0.35, 1.00],
    'disableLerp': true
  });
  
 
});

/*
================================================================================
RELOAD ON MOBILE ORIENTATION CHANGE
================================================================================
*/
(function(w){

  var ua = navigator.userAgent;
  if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ) {
    return;
  }

  var doc = w.document;
  if( !doc.querySelector ){ return; }

  var meta = doc.querySelector( "meta[name=viewport]" );
  var initialContent = meta && meta.getAttribute( "content" );
  var disabledZoom = initialContent + ",maximum-scale=1";
  var enabledZoom = initialContent + ",maximum-scale=10";
  var enabled = true;
  var x, y, z, aig;

  if( !meta ){ return; }

  function restoreZoom(){
    meta.setAttribute( "content", enabledZoom );
    enabled = true;
  }

  function disableZoom(){
    meta.setAttribute( "content", disabledZoom );
    enabled = false;
  }

  function checkTilt( e ){
    aig = e.accelerationIncludingGravity;
    x = Math.abs( aig.x );
    y = Math.abs( aig.y );
    z = Math.abs( aig.z );

    if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
      if( enabled ){ disableZoom(); }
    } else if( !enabled ) {
      restoreZoom();
    }
  }

  w.addEventListener( "orientationchange", restoreZoom, false );
  w.addEventListener( "devicemotion", checkTilt, false );

})( this );
}


/*
================================================================================
PRELOADER --> vodi na --> INIT CONTENT
================================================================================
*/
function initLoader() {

  const tlLoaderIn = gsap.timeline({
    id: 'tlLoaderIn',
    defaults: {duration: 0.8, ease: 'power2.out'},
    onComplete: () => initContent()
  });

  const image = select('.loader-img-img');
  const mask = select('.loader__image--mask');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');

  const loader = select('.loaderx');
  const loaderInner = select('.inner-loader');

  tlLoaderIn

    .set(loaderContent, {autoAlpha: 1})
    .set(".txt", {yPercent: 100}) 
    .set(".imgg", {yPercent: 100})
    /* .set(".char", {yPercent: 100}) */
   /*  .set(mask, {yPercent: 0}) */
    //.set(image, {yPercent: 100})
    //.set(".main", {y: 150})


    .to(loaderInner, {scaleX: 0,transformOrigin: 'right bottom',ease: 'power1.inOut'}) 

    .addLabel('revealImage')
    //.to(image, {yPercent: 0}, 'revealImage-=0.5') 
    .to(".imgg", {yPercent: 0})
    /* .to(".txt", {yPercent: 0}) */
    .to(".txt", {yPercent: 0, stagger: 0.3}, 'revealImage-=0.4');

  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {duration: 1.1, ease: 'power2.inOut'},delay: 1});

  tlLoaderOut

    .to(lines, {yPercent: -1200, stagger: 0.05}, 0)
    .to([loader, loaderContent], {yPercent: -100}, '-=0.2')
    //.to('.main', {y: 0}, 0);

  const tlLoader = gsap.timeline();
  tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut);
}


/*
================================================================================
INIT CONTENT --> vodi na --> INIT SCROLL
================================================================================
*/
function initContent() {

  select('body').classList.remove('is-loading');
  initScroll();
  console.log("Locoscroll+Scrolltrigger loaded after preloader done");

  //initNavigation();
  //initHeaderTilt();

}

/*
================================================================================
BARBA PAGE TRANSITION IN
================================================================================
*/
function pageTransitionIn({
  container
}) {
  // console.log('pageTransitionIn');
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power3.inOut'}});
  tl
   /* .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: -100}, {yPercent: 0})
    .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0) */
    .to(container, {autoAlpha:0, force3D: true}, 0);

  return tl;
}


/*
================================================================================
BARBA PAGE TRANSITION OUT
================================================================================
*/
function pageTransitionOut({
  container
}) {
  //console.log('pageTransitionOut');
  // timeline to move loader away down
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: 'power3.inOut'},
    // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    /*.to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)*/
    .from(container, {autoAlpha:0, force3D: true}, 0);
  return tl;
}

/*
================================================================================
♥️ BARBA GLOBAL HOOKS + PREFETCH + INIT + VIEWS + TRANSITIONS
================================================================================
*/
function initPageTransitions() {
  // do something before the transition starts
  barba.hooks.before(() => {
    select('html').classList.add('is-transitioning');
  });
  // do something after the transition finishes
  barba.hooks.after(() => {
    select('html').classList.remove('is-transitioning');
  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
    //strigtest();

  });
  //kill scrolltrigger
  barba.hooks.beforeLeave(() => {
    locoScroll.destroy();
    console.log("Locomotive scroll destroyed!");
  });
  //init scrolltrigger
  barba.hooks.afterEnter(() => {
    // console.log("možda ode učitat locoscroll");

  });


  /*
  ================================================================================
  BARBA PREFETCH
  ================================================================================
  */

  barba.use(barbaPrefetch);
  /*


  ================================================================================
  BARBA INIT 
  ================================================================================
  */

  barba.init({
    debug: true,
    prefetch: true,
  /*
================================================================================
BARBA VIEWS
================================================================================
*/  
views: [{
  namespace: 'home',

  beforeEnter(data) {
  titleHero();
   heroSwiper();
   console.log("SWIPPPPPPPP 1");

  },
  once(data) {
    titleHero();
    heroSwiper();
    console.log("SWIPPPPPPPP 2");

  },
  afterEnter(data) {
  
  
  }


},{
  namespace: 'projects',
  beforeEnter(){
    projectsHeroAnima();
    projectAnchorScroll();
  
  },
  once(){
   // projectsHeroAnima();
    projectAnchorScroll();
  
  }

},{
    namespace: 'tailored',
  beforeEnter(data) {
    tailoredHeroAnima();
 
  }},{
  namespace: 'contact',
  afterEnter(data) {
    contactHeroAnima();

  }},{
  },{
 

}],
    /*
    ================================================================================
    BARBA TRANSITIONS
    ================================================================================
    */
    transitions: [{
      // ROUTE AKO IDE NA ABOUT IDE DRUGA ANIMACIJA

      //sync: true,
      once({
        next
      }) {
        // do something once on the initial page load
        initLoader();
       
        fullscreenMenuNew(); 
        fsmenuHover();
        underlineMouseover();
        console.log("FULLSCREEN MENU LOADED --- loaded");
      
        
      },

      async leave({
        current
      }) {

          // animate loading screen in
        await pageTransitionIn(current);
        


      },
      enter({
        next
      }) {
        // animate loading screen away
        pageTransitionOut(next);
        
      },

      afterEnter({
        next
      }) {
      
        fsmenuHover();
     

      },

      beforeEnter({next}) {
        underlineMouseover();
         

      },





    }],

    /*
    ================================================================================
    PREVENT / CLICKS DURRING TRANSITION AND CURRENT LINK + SCROLL TO TOP
    ================================================================================
    */
    prevent: ({
      event,
      href
    }) => {
      if (event.type === 'click') {

        // prevent the user to reload the page if the location is the same
        if (href === window.location.href) {
          event.preventDefault();
          event.stopPropagation();
          // automatically scroll to the top of the page on same location
          locoScroll.scrollTo( '#top', {
            'offset': 0,
            'duration': 1000,
            'easing': [0.25, 0.00, 0.35, 1.00],
            'disableLerp': true
          });
          //   locoScroll.scrollTo('#top')
          return true;
        }
        if (barba.transitions.isRunning) {
          event.preventDefault();
          event.stopPropagation();

          return true;
        }
      }
    }
  });


  /*
  ================================================================================
  UPDATE ACTIVE CLASS ON THE MENU - BASED ON THE GIVEN URL
  ================================================================================
  */
  /*
  function updateMenu(url) {
    const active = document.querySelector('.g-header .nav-link.active');

    if (active !== null) {
      active.classList.remove('active');
    }

    const links = Array.from(document.querySelectorAll('.g-header .nav-link'));

    const index = links.map(link => link.href).findIndex((href) => {
      return url.indexOf(href) !== -1;
    });

    if (index !== -1) {
      links[index].classList.add('active');
    }
  }

  // hooks that will be triggered before any page transition
  // meaning your menu active class will be updated before going to the next page
  barba.hooks.before((data) => {
    updateMenu(data.trigger.href);
  });
  */
  /*
  ================================================================================
  UPDATE ACTIVE CLASS ON THE MENU - BASED ON THE GIVEN URL
  ================================================================================
  */

  function init() {
    initLoader();
  }

}

/*
================================================================================
MENU - UNDERLINE AND HAMBURGER ANIMATION
================================================================================
*/

function underlineMouseover() {

/*
  ================================================================================
  MENU ICON MOUSEOVER
  ================================================================================
  *//*
  // MENU ICON MOUSEOVER 
  menuhover.addEventListener('mouseover', () => {
    let menuhovertimeline = gsap.timeline({
      defaults: {
        autoAlpha: 1
      }
    })
    //animation.paused( true ); 
    menuhovertimeline
      .to(".mline2", {
        width: "100%",
        duration: 0.1
      })
      .to(".mline3", {
        width: "100%"
      }, "<-0.05")
  })
  // MENU ICON MOUSEOUT 
  menuhover.addEventListener('mouseout', () => {
    let menuhovertimeline = gsap.timeline({
      defaults: {
        autoAlpha: 1
      }
    })
    //animation.paused( true ); 
    menuhovertimeline
      .to(".mline2", {
        width: "80%",
        duration: 0.1
      })
      .to(".mline3", {
        width: "55%"
      }, "<-0.05")
  })
*/
  /*
  ================================================================================
  MENU UNDERLINE
  ================================================================================
  */

  // Mouseenter function
  function enterAnimation(link, e, index) {
    link.tl.tweenFromTo(0, "midway");
  }
  // Mouseleave function
  function leaveAnimation(link, e) {
    link.tl.play();
  }
  // Animations variables
  let workLinkUnderlineAnimEnter;
  let workLinkUnderlineAnimLeave;

  // Get all links
  let workLinks = document.querySelectorAll(".link-wrapper");

  workLinks.forEach((link, index, value) => {

  let underline = link.querySelector(".underline");
  link.tl = gsap.timeline({paused: true});
  link.tl.fromTo(underline, {width: "0%", left: "0%"}, {width: "100%", duration: 0.3, ease: "power1.out"});
  link.tl.add("midway");
  link.tl.fromTo(underline, {width: "100%",left: "0%"}, {width: "0%",left: "100%", duration: 0.3, ease: "power1.in", immediateRender: false});

  // Mouseenter
  link.addEventListener("mouseenter", (e) => {
       enterAnimation(link, e, index);
  });

  // Mouseleave
  link.addEventListener("mouseleave", (e) => {
    leaveAnimation(link, e);
    });

  });

}



/*
================================================================================
FULLSCREEN MENU
================================================================================
*/
function fullscreenMenuNew() {

/*OLD MENU*/
 /* const burger = select('.fs-nav-butt');*/
   const fnav = select('.f-nav');
//  let menuIsOpen = false; // tracks state


  const mainwrap = select('.nav-w');
  const slide = select('.nav--transition-slide');
  const burger = select('.fs-nav-butt');
  const klll = select('.f-nav-wrap')
  const linko = select('.line-wrapper')
 /*   const test = select('.link-wrapper') */

/*GREENSOCK*/
var menuAnimation = gsap.timeline({paused:true});
var menuAnimationBack = gsap.timeline({paused:true});

//var navMain = document.getElementById("nav-main");
//var menuButton = document.getElementById("menu-button");


var toggle = true;

/*/
/* -----------------------------
// MENU IN ANIMATION
----------------------------- */
  
//const menuIn = gsap.timeline({paused: true, reversed: true});

//menuIn

menuAnimation
.to(".open", {duration: 0.2, autoAlpha:1, rotate:22.5})
.from(".close", {duration: 0.2, autoAlpha:0 })
.to(".open", {autoAlpha:0}, "<")
  /* .to(navMain, {xPercent: 100, duration: 0.8, ease: "Expo.inOut"},0) */


.set(burger, {pointerEvents: "none"}, "<")
.to(mainwrap, {scaleY: 1, duration: 0.1}, "<0.1")
.fromTo(slide, {scaleY: 0, transformOrigin: "bottom center"}, {duration: 0.45, scaleY: 1, ease: "Expo.inOut" }, "<0.2") 
.fromTo(".f-nav", {yPercent: 185}, {duration: 0.45, yPercent: 0, stagger: 0.05}, "<0.3")
.fromTo(".fadeinnav", {autoAlpha: 0}, {duration: 0.65, autoAlpha: 1, ease: "Expo.inOut"}, "<0.8")

.set(burger, {pointerEvents: "all"})
 
/* -----------------------------
// MENU OUT  ANIMATION
----------------------------- */
  
/* let menuOut = gsap.timeline({paused: true });
  
menuOut */

menuAnimationBack
.to(".close", {duration: 0.01, autoAlpha:0},0)
.to(".open", {duration: 0.01, autoAlpha:1},0)
.to(".open", {duration: 0.2, rotate:0}, "<")


.set(burger, {pointerEvents: "none"}, "<")

.to(".f-nav", {duration: 0.3, yPercent: -110, stagger: 0.05, force3D: true}, "<0.1")
.to(".fadeinnav", {autoAlpha: 0, duration: 0.3, ease: "Expo.out"}, "<0.2")
.to(slide, {duration: 0.8,transformOrigin: "top center", scaleY: 0, ease: "Expo.inOut"}, "<0.3")

.set(burger, {pointerEvents: "all"})


.set(slide, {scaleY: 0, transformOrigin: "bottom center"})
.set(mainwrap, {scaleY: 0})
.set(".fadein", {autoAlpha:0})

/* 
.set(".f-nav", {yPercent: 185})
 */





///////////////////////menuIn.invalidate();
/* -----------------------------
// ADD EVENT LISTER
----------------------------- */
  

burger.onclick = function() {

  toggle = !toggle;
  toggle == false ? menuAnimation.play(0) : menuAnimationBack.play(0);
};

/* CLICK ON LINK CLOSE MENU*/
 
$('nav li a, .menutrig').on('click', function(){
    $(burger).trigger('click');
});

  
}
 
/*
================================================================================
FULLSCREEEN MENU HOVER GRAY
================================================================================
*/
function fsmenuHover() {

const dev = {};

dev.interactions = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {

    let $filters = document.querySelectorAll("[data-filters] a");
    $filters.forEach(function($filter) {
      $filter.addEventListener("mouseenter", dev.interactions.filtersOnEnter);
      $filter.addEventListener("mouseleave", dev.interactions.filtersOnLeave);
    });

  },

  filtersOnEnter: function(e) {
    // fade out all anchors
    gsap.to("[data-filters] a", {duration:0.5, color: "#D0D0CE"});
    
    // keep hovered anchor the same
    gsap.to(e.target, {color: "#1e1e1e", overwrite: true});
  },

  filtersOnLeave: function(e) {
    // animate all anchors to normal calue
    gsap.to("[data-filters] a", {duration:0.5, color: "#1e1e1e"});
  }
};
dev.interactions.init();

}

/*
================================================================================
PROJECTS - ANCHOR SCROLL
================================================================================
*/

function projectAnchorScroll() {

$( "#tocom" ).on( "click", function() {
  locoScroll.scrollTo( '#com', {
    'offset': -120,
    'duration': 2000,
    'easing': [0.25, 0.00, 0.35, 1.00],
    'disableLerp': true
  });
});

$( "#tores" ).on( "click", function() {
  locoScroll.scrollTo( '#res', {
    'offset': -150,
    'duration': 800,
    'easing': [0.25, 0.00, 0.35, 1.00],
    'disableLerp': true
  });
});
}

/*
================================================================================
HOME PAGE TITLE & HERO GALLERY
================================================================================
*/
function titleHero() {

  Splitting();
  console.log("Splitting update?");
  
 /*
 ================================================================================
 CLIPPING PATH MASK REVEAL & TEXT REVEAL
 ================================================================================
 */

 const mq = window.matchMedia('(min-width: 999px)')
if (mq.matches) {
 var animation = gsap.timeline({defaults:{force3d: true, ease: "power3.inOut"}})
 animation
 .from(".char", {stagger:0.02, yPercent:130, duration:1.5})
 .fromTo(".clip", {autoAlpha:0, y:200, clipPath:"polygon(40% 30%, 60% 30%, 60% 90%, 40% 90%)"}, 
 { autoAlpha:1, duration:2, y:0, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, "-=1.8")


}
else {
var heroanimation = gsap.timeline({defaults:{ease: "power3.inOut"}})
  heroanimation
.set(".char", {autoAlpha:1} ); 
}

}


/*
================================================================================
PROJECTS - HERO ANIMACIJA
================================================================================
*/
function projectsHeroAnima() {

  Splitting();
  

  // Create a media condition that targets viewports at least 768px wide




const mq = window.matchMedia('(min-width: 999px)')
if (mq.matches) {
  var heroanimation = gsap.timeline({defaults:{force3d: true, ease: "power3.inOut"}})
  heroanimation
  /* .set(".hide", {autoAlpha:1}) */
  .from(".char", {duration:1.5, stagger:0.02, yPercent:130},"<")
  .fromTo(".in1", {autoAlpha:0, y:40},{duration:0.8,autoAlpha:1, y:0}, "<0.6")
  .fromTo(".in2", {autoAlpha:0, y:40},{duration:0.6, autoAlpha:1, stagger:0.2, y:0}, "<0.1")
  .fromTo(".clip", {y:200, autoAlpha:0, clipPath:"polygon(40% 30%, 60% 30%, 60% 90%, 40% 90%)"}, 
  {autoAlpha:1, duration:2, y:0, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, "-=2")

}
else {
  var heroanimation = gsap.timeline({defaults:{ease: "power3.inOut"}})
  heroanimation
.set(".in1, .in2", {autoAlpha:1} );
}





  
  }

  /*
================================================================================
TAILORED - HERO ANIMACIJA
================================================================================
*/
function tailoredHeroAnima() {

  Splitting();
  
const mq = window.matchMedia('(min-width: 999px)')
if (mq.matches) {
var heroanimation = gsap.timeline({defaults:{force3d: true, ease: "power3.inOut"}})
  heroanimation
  //.set(".hide", {autoAlpha:1})
  .from(".char", {duration:1.5, stagger:0.02, yPercent:130})
  .fromTo(".t1", {autoAlpha:0, y:40},{duration:0.8, autoAlpha:1, y:0}, "<0.6")
  .fromTo(".clip", {y:200, autoAlpha:0, clipPath:"polygon(40% 30%, 60% 30%, 60% 90%, 40% 90%)"}, 
  {autoAlpha:1, duration:1.8, y:0, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, "-=1.8")


}
else {
  var heroanimation = gsap.timeline({defaults:{ease: "power3.inOut"}})
  heroanimation
.set(".t1", {autoAlpha:1} )
.set(".clip", {autoAlpha:1} )
}




  
  
}

/*
================================================================================
CONTACT - HERO ANIMACIJA
================================================================================
*/
function contactHeroAnima() {

Splitting();



const mq = window.matchMedia('(min-width: 999px)')
if (mq.matches) {
var heroanimation = gsap.timeline({defaults:{ease: "power3.inOut"}})
heroanimation
.from(".char", {stagger:0.02, duration:1.5,yPercent:130})
.fromTo(".c1", {autoAlpha:0, y:40},{duration:0.8, autoAlpha:1, stagger:0.02, y:0}, "-=1.2")


}
else {
  var heroanimation = gsap.timeline({defaults:{ease: "power3.inOut"}})
  heroanimation
.set(".c1", {autoAlpha:1} );
}




}
 
/*
================================================================================
SWIPER - HERO ANIMACIJA
================================================================================
*/

function heroSwiper() {

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
 loop: true,
		speed: 1000,
     
autoHeight: false,
updateOnWindowResize: true,
effect: 'fade',
slidesPerView: 1,
    observer: true,
  observeParents: true,
  observeSlideChildren: true,
  longSwipes: false,
  grabCursor: true,
  	autoplay: {
				delay: 5000,
				disableOnInteraction: true,
},

});

}


 

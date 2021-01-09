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
  gsap.set(loader, {
    autoAlpha: 1
  });

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
    touchMultiplier: 4,
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
  locoScroll.update();
  console.log("Locomotive Updated once more");;
  //locoScroll.scrollTo( 'top' );
  // When window reszie, need to update locomotive scroll.
  /* $( window ).on( 'resize', function() {
                  locoScroll.update();
                  console.log("JEBOTE RESIZED!");
} 

); */

  /*
  ================================================================================
  SCROLLTRIGGER TEST
  ================================================================================
  */
  /*
    gsap.utils.toArray('.block1').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
         // markers: true,
          scroller: ".smooth-scroll",
          start: 'top bottom',
          end: "top top",
        },
        y: 100,
        opacity: 0
      })
    });
    console.log("Scrolltrigger animacija loaded");
  */
  /*
================================================================================
LOCOMOTIVE 4 SCROLL TO TOP
================================================================================
*/
  /*
  	locoScroll.scrollTo( '#top', {
  		'offset': 0,
  		'duration': 5000,
  		//'easing': [0.25, 0.00, 0.35, 1.00],
  		'disableLerp': true
  	});
    */
}

/*
================================================================================
PRELOADER --> vodi na --> INIT CONTENT
================================================================================
*/
function initLoader() {

  const tlLoaderIn = gsap.timeline({
    id: 'tlLoaderIn',
    defaults: {
      duration: 1.1,
      ease: 'power2.out'
    },
    onComplete: () => initContent()
  });

  const image = select('.loader-img-img');
  const mask = select('.loader__image--mask');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');

  const loader = select('.loaderx');
  const loaderInner = select('.inner-loader');

  tlLoaderIn

    .set(loaderContent, {
      autoAlpha: 1
    })
    .set(".txt", {
      yPercent: 100
    })
    .set(mask, {
      yPercent: 0
    })
    .set(image, {
      yPercent: 100
    })
    .set(".main", {
      y: 150
    })

    .to(loaderInner, {
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: 'power1.inOut'
    })

    .addLabel('revealImage')
    .to(image, {
      yPercent: 0
    }, 'revealImage-=0.5')
    .to(".txt", {
      yPercent: 0,
      stagger: 0.2
    }, 'revealImage-=0.4');

  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {
      duration: 1.2,
      ease: 'power2.inOut'
    },
    delay: 1
  });

  tlLoaderOut

    .to(lines, {
      yPercent: -500,
      stagger: 0.2
    }, 0)
    .to([loader, loaderContent], {
      yPercent: -100
    }, 0.2)
    .to('.main', {
      y: 0
    }, 0);

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
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power1.inOut'}});
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
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: 'power1.inOut'},
    // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    /*.to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)*/
    .from(container, {autoAlpha:0.5, }, 0);
  return tl;
}

/*
================================================================================
BARBA GLOBAL HOOKS + PREFETCH + INIT + VIEWS + TRANSITIONS
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
  console.log("Prefetch loaded");
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
    //titleHero();
   // titleHero();
    /*bigLogo();
    homeYoutube();
    homeProductHover();
    simpleTicker();
    simpleTickerShow();*/
  console.log("Home JS triggered!");
  },
  afterEnter(data) {
      
    /*bigLogo();
    homeYoutube();
    homeProductHover();
    simpleTicker();
    simpleTickerShow();*/
  console.log("Home JS triggered!");
  }


},{
  namespace: 'projects',
  beforeEnter(){
   /* productsMainSwiper();
    resetLogo();
    simpleTickerHide();*/
  console.log("Projects JS triggered!");
  }},{
    namespace: 'materials',
  beforeEnter(data) {
    //soloProductsLottie(container);
   /* simpleTickerHide();
    productsoloAccordion();*/
  console.log("Materials JS triggered!");
  }},{
  namespace: 'contact',
  beforeEnter(data) {
   // simpleTickerHide();
  console.log("contact JS triggered!");
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

      sync: true,
      once({
        next
      }) {
        // do something once on the initial page load
        initLoader();
        titleHero();
        console.log("title hero loaded");
        fullscreenMenu();
        console.log("fullscreenmenu loaded");
        //resetActiveLink();
        //animationEnter();
        //homeanimations();
        
      },

      async leave({
        current
      }) {
        // animate loading screen in
        await pageTransitionIn(current);
        console.log("LEAVE");


      },
      enter({
        next
      }) {
        // animate loading screen away
        pageTransitionOut(next);
        console.log("NEXT");
      },

      afterEnter({
        next
      }) {
        //animationEnter();
        titleHero();
        //fullscreenMenu();
        console.log("AFTER ENTER");

      },

      beforeEnter({next}) {
        killMenu();

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
FULLSCREEN MENU
================================================================================
*/
function fullscreenMenu() {
  // OPEN MENU FROM CLICK
  //const openmenu = document.getElementById('openmenu');
  //const closemenu = document.getElementById('closemenu');
  const menuhover = document.getElementById('menuhover');

  //OPEN CLOSE MENU

  const {
    gsap
  } = window;

  // ACTIVE BOTUN
  const btn = document.querySelector(".menu-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      hide();
    } else {
      btn.classList.add("active");
      show();
    }
  });

  // SHOW MENU
  function show() {

    let tl = gsap.timeline();

    gsap.set(".menu-btn", {pointerEvents: "none",});

    tl.fromTo(".nav--transition-slide", {scaleY: 0, transformOrigin: "bottom center",}, 
    {duration: 0.5, scaleY: 1, ease: "Expo.inOut", }) 
       
    .set(".menu-btn", {pointerEvents: "all",})

      /*.fromTo(".f-img-mask",	{clipPath:"polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"},
		{duration:0.5, ease: "Expo.inOut", sclipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}) */

      .fromTo(".f-img-mask", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"}, 
        {autoAlpha: 1, duration: 0.55,y: 0,clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"})

      .fromTo(".f-nav", {yPercent: 150,}, {duration: 0.65, yPercent: 0, stagger: 0.02,}, "<0.1")
      //.fromTo(".f-cap", {yPercent: 100,}, {duration: 0.65,yPercent: 0,stagger: 0.02,}, "<")
      .fromTo(".f-foot, .arch, .copy-right", {y: 20,autoAlpha: 0}, 
        {duration: 0.65,y: 0,autoAlpha: 1, ease: "Expo.inOut",
        //stagger: 0.15,
      }, "<0.1")

  }

  // HIDE MENU
  function hide() {
    let tl = gsap.timeline();

    gsap.set(".menu-btn", {
      pointerEvents: "none",
    });

    /*tl.fromTo(".f-img-mask", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    }, {
      autoAlpha: 1,
      duration: 0.65,
      y: 0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    })
*/
    tl.to(".f-nav", {duration: 0.65,yPercent: -150,ease: "Expo.inOut",
        //stagger: -0.15,
      }, 0)
      .fromTo(".f-foot, .arch, .copy-right", {y: 0,autoAlpha: 1}, 
        {duration: 0.65,y: -20,autoAlpha: 0,ease: "Expo.inOut",
        //stagger: 0.15,
      }, "<0.1")
      .to(".nav--transition-slide", {duration: 0.35,transformOrigin: "top center", scaleY: 0, ease: "Expo.inOut",})

      //.to(".nav-W", {scaleY: 0})
      .set(" .menu-btn", {pointerEvents: "all",});
  }

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
    link.tl = gsap.timeline({
      paused: true
    });

    link.tl.fromTo(underline, {
      width: "0%",
      left: "0%",
    }, {
      width: "100%",
      duration: 0.3,
      ease: "power1.out",
    });

    link.tl.add("midway");

    link.tl.fromTo(underline, {
      width: "100%",
      left: "0%",
    }, {
      width: "0%",
      left: "100%",
      duration: 0.3,
      ease: "power1.in",
      immediateRender: false
    });

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
HOME PAGE TITLE & HERO GALLERY
================================================================================
*/
function titleHero() {

  Splitting();
  console.log("Splitting update?");
  /*
 ================================================================================
 IMAGE EXCHANGE GALLERY
 ================================================================================
 */
 var imgs = $.makeArray( $('#images img') );
 imgs.reverse();
 
 function crossfade(){
 gsap.to(imgs[0], {duration:2, autoAlpha:0}) 
 gsap.to(imgs[1], {duration:2, autoAlpha:1})
 imgs.push( imgs.shift() )
 }
 
 var cycle = setInterval(crossfade,3000)
 
 
 /*
 ================================================================================
 CLIPPING PATH MASK REVEAL & TEXT REVEAL
 ================================================================================
 */
 var animation = gsap.timeline({defaults:{duration:1.5, ease: "power3.inOut"}})
 animation
 .set(".hide", {autoAlpha:1}, "<")
 .from(".char", {stagger:0.02, yPercent:110}, "<0.1")
 .fromTo(".clip", {y:400, clipPath:"polygon(40% 30%, 60% 30%, 60% 90%, 40% 90%)"}, 
 {autoAlpha:1, duration:3, y:0, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, "<0.1")
 
 
 }


 /*
================================================================================
HOME PAGE TITLE & HERO GALLERY
================================================================================
*/
function killMenu() {

  let tl = gsap.timeline();

  gsap.set(".menu-btn", {
    pointerEvents: "none",
  });

  tl.to(".f-nav", {duration: 0.65,yPercent: -150,ease: "Expo.out",
      //stagger: -0.15,
    }, 0)
    .fromTo(".f-foot, .arch, .copy-right", {y: 0,autoAlpha: 1}, 
      {duration: 0.65,y: -20, autoAlpha: 0, ease: "none",
      //stagger: 0.15,
    }, "<0.1")
    //.to(".nav--transition-slide", {duration: 0.35,transformOrigin: "top center", scaleY: 0, ease: "Expo.out",},"<0.1")
    .to(".nav--transition-slide", {autoAlpha:0, duration: 0.35},"<0.1")
    .to(".nav--transition-slide", {scaleY: 0, duration: 0.1},"<0.1")
    //.to(".nav-W", {scaleY: 0})
    .set(" .menu-btn", {pointerEvents: "all",});

  
 
 }
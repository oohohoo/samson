// --- H1 SPLITTING

// SPLITTING 
Splitting();



>ALL
// OPEN MENU FROM CLICK
//const openmenu = document.getElementById('openmenu');
//const closemenu = document.getElementById('closemenu');
const menuhover = document.getElementById('menuhover');



//OPEN CLOSE MENU

const { gsap } = window;


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

	gsap.set(".menu-btn", {
		pointerEvents: "none",
	});
  
  
	tl.fromTo(".nav--transition-slide", {scaleY: 0, transformOrigin: "bottom center",},
		{duration: 0.5, scaleY: 1, ease: "Expo.inOut",})
	
  	.set(".menu-btn", {
		pointerEvents: "all",
	})


 	/*.fromTo(".f-img-mask",	{clipPath:"polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"},
		{duration:0.5, ease: "Expo.inOut", sclipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}) */


.fromTo(".f-img-mask", {clipPath:"polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"}, 
{autoAlpha:1, duration:0.65, y:0, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"})
	
	
	.fromTo(".f-nav",{yPercent: 110,}, {duration: 0.65, yPercent: 0, stagger: 0.02, },"<0.1")
    .fromTo(".f-cap",{yPercent: 100,}, {duration: 0.65, yPercent: 0, stagger: 0.02, },"<")
    
    .fromTo(".f-foot",	{y: 20,	autoAlpha:0},
		{duration: 0.65, y:0, autoAlpha:1, ease: "Expo.inOut", stagger: 0.15, }, "<0.1")
    
    }
    
// HIDE MENU
function hide() {
	let tl = gsap.timeline();

	gsap.set(".menu-btn", {
		pointerEvents: "none",
	});

tl.fromTo(".f-img-mask", {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, 
{autoAlpha:1, duration:0.65, y:0, clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})

	tl.to(".f-nav",	{duration: 0.35, yPercent: -110, ease: "Expo.inOut", stagger: -0.15, }, 0)
    .fromTo(".f-foot",	{y: 0,	autoAlpha:1}, {duration: 0.65, y:-20, autoAlpha:0, ease: "Expo.inOut", stagger: 0.15, }, "<0.1")
    .to(".nav--transition-slide", {duration: 0.5, transformOrigin: "top center", scaleY: 0, ease: "Expo.inOut", })
     
	  //.to(".nav-W", {scaleY: 0})
		.set(" .menu-btn", {pointerEvents: "all",});
}

>ALL
/*
================================================================================
MENU ICON MOUSEOVER
================================================================================
*/
// MENU ICON MOUSEOVER 
menuhover.addEventListener('mouseover', ()=> {  
    let menuhovertimeline = gsap.timeline({defaults:{autoAlpha:1}})
    //animation.paused( true ); 
    menuhovertimeline
    .to(".mline2", {width: "100%", duration: 0.1})
    .to(".mline3", {width: "100%"}, "<-0.05")
    })
    // MENU ICON MOUSEOUT 
    menuhover.addEventListener('mouseout', ()=> {  
    let menuhovertimeline = gsap.timeline({defaults:{autoAlpha:1}})
    //animation.paused( true ); 
    menuhovertimeline
    .to(".mline2", {width: "80%", duration: 0.1})
    .to(".mline3", {width: "55%"}, "<-0.05")
    })
    
    
    
    >ALL
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
      
      link.tl.fromTo(underline, {width: "0%", left: "0%",}, 
      {width: "100%", duration: 0.3, ease: "power1.out",});
              
      link.tl.add("midway");
      
      link.tl.fromTo(underline, {width: "100%", left: "0%",}, 
      {width: "0%", left: "100%", duration: 0.3, ease: "power1.in", immediateRender: false});
    
      // Mouseenter
      link.addEventListener("mouseenter", (e) => {
        enterAnimation(link, e, index);
      });
    
      // Mouseleave
      link.addEventListener("mouseleave", (e) => {
        leaveAnimation(link, e);
      });
    
    });
    

>HOME
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



>HOME
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









 









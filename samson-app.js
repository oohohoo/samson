/*
  ================================================================================
    SMOOTH SCROLL + SCROLLTRIGGER
  ================================================================================
  */

// --- REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
	el: document.querySelector(".smooth-scroll"),
	smooth: true,
	getDirection: true,
	//smoothMobile: true,
	//lerp: .05
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	}, // we don't have to define a scrollLeft because we're only scrolling vertically.
	getBoundingClientRect() {
		return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
	},
	
	// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
	// we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
	// UKLJUČITI SAMO NA MOBILNOJ VERZIJI
	// pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// MENU

// PLAY WHEN ALL CONTENT LOADED
document.addEventListener ('DOMContentLoaded', ()=> {

	// OPEN MENU FROM CLICK
	const openmenu = document.getElementById('openmenu');
	const closemenu = document.getElementById('closemenu');
	//const menuhover = document.getElementById('menuhover');
	
	
	const { gsap } = window;
	
	const btn = document.querySelector(".nav-toggle");
	
	btn.addEventListener("click", () => {
		if (btn.classList.contains("active")) {
			btn.classList.remove("active");
			hide();
		} else {
			btn.classList.add("active");
			show();
		}
	});
	// --- SHOW
	function show() {
		let tl = gsap.timeline();
	
		gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});
		gsap.set(".fs-menu--column", {yPercent:-100})
	  gsap.set(".close", {autoAlpha:0})
	  
		tl.fromTo(".nav-wrapper", {height: "0%", transformOrigin: "top center"}, {duration: 0.1, height: "100%"})
			.to(".fs-menu--column", {yPercent:0, duration:0.4, stagger:0.05, ease: "Expo.inOut"}, "<")
			.to(".open", {autoAlpha:0}, "<")
			.to(".close", {autoAlpha:1}, "<")
		
			.from(".main-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<0.3")
			.from(".small-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<")
			.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.5")
		
		.set(".nav-wrapper, .nav-toggle", {pointerEvents: "all"}, "<")
	
	}
	// --- SHOW
	function hide() {
		let tl = gsap.timeline();
	
		gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});
	
			tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.4, stagger:0.05, ease: "Expo.inOut"})
			.to(".nav-wrapper", { duration: 0.1, transformOrigin: "top center", height: "0%"})
			.to(".open", {autoAlpha:1}, "<")
			.to(".close", {autoAlpha:0}, "<")
		
			.set(" .nav-toggle", { pointerEvents: "all"});
		
	}
	
	
	//-------
	// SUPERSCRIPT MOUSEOVER // ISTA ANIMACIJA VIŠE ELEMENATA / LOOP
	// loop through each element
	$(".link-wrapper").each(function(i, el) {
	// set some individual properties
	//TweenMax.set($(el).find('.back'), {backgroundColor:'#' + Math.floor(Math.random() * 16777215).toString(16)});
	  
	// create a timeline for this element in paused state
	  var tl = gsap.timeline({paused: true});
	  // create your tween of the timeline in a variable
	  var t = tl
			 //.set(el,{willChange:"transform"})
			 //.set($(el).find('.wrap'), {zIndex: 2, overwrite:"all"})
			 .from($(el).find('.superscript'), {y:"20px", autoAlpha:0, duration: 0.3, overwrite:"all", ease: "power1.out"})
			 .to($(el).find('.main-link'), {duration: 0.3, overwrite:"all", ease: "power1.out"}, "<");
	  // store the tween timeline in the javascript DOM node
	  el.animation = t;
	  //create the event handler
	  $(el).on("mouseenter",function(){
		this.animation.play();
	  }).on("mouseleave",function(){
		this.animation.reverse();
	  });
	});
	//-------
	
	//-------
	// SUBMENU - CHANGE COLOR HOVER / LOOP / ista skripta ko ova poviše ali bez komentara
	// loop through each element
	$(".small-link-wrapper").each(function(i, el) {
	  var tl = gsap.timeline({paused: true});
	  var t = tl
			 .to($(el).find('.small-link'), {color: "#E51E3D", duration: 0.15});
	el.animation = t;
	$(el).on("mouseenter",function(){
		this.animation.play();
	  }).on("mouseleave",function(){
		this.animation.reverse();
	  });
	});
	//-------
	//-------
	// LANGUAGE - CHANGE COLOR HOVER / LOOP / ista skripta ko ova poviše ali bez komentara
	// loop through each element
	$(".lang-wrap").each(function(i, el) {
	  var tl = gsap.timeline({paused: true});
	  var t = tl
			 .fromTo($(el).find('.language'), {color: "#000000"}, {color: "#E51E3D", duration: 0.15});
	el.animation = t;
	$(el).on("mouseenter",function(){
		this.animation.play();
	  }).on("mouseleave",function(){
		this.animation.reverse();
	  });
	});
	//-------
	
	// UNDERLINE
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
	
	
	// EVENT LISTENERS
	openmenu.addEventListener("click", function(){ animation.restart(), animation.play(); });
	closemenu.addEventListener("click", function(){aniout.restart(), aniout.play(); });
	
	}) // DOM CONTENT LOADED - close
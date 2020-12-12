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
	scrollFromAnywhere: true,
	touchMultiplier: 4,
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


// --- 017 - LOCOMOTIVE 4.0 SCROLL TO  --------------------------------------------------------------------------
$( "#totop" ).on( "click", function() {
	locoScroll.scrollTo( '#top', {
		'offset': 0,
		//'duration': 600,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
	});
	
	$( "#tocom" ).on( "click", function() {
	locoScroll.scrollTo( '#com', {
		'offset': -300,
		//'duration': 600,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
	});
	$( "#tores" ).on( "click", function() {
	locoScroll.scrollTo( '#res', {
		'offset': -300,
		//'duration': 600,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
	});
	$( "#tospe" ).on( "click", function() {
	locoScroll.scrollTo( '#spe', {
		'offset': -300,
	//	'duration': 600,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
	});
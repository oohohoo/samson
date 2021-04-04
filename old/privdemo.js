// --- H1 SPLITTING

// SPLITTING 
Splitting();


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









 









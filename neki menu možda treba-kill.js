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

 
      .fromTo(".f-nav", {yPercent: 110,}, {duration: 0.65, yPercent: 0, stagger: 0.02,}, "<")
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

 
    tl.to(".f-nav", {duration: 0.65,yPercent: -110,ease: "Expo.inOut",
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
*/
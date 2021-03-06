// ******** NAV BAR >> ALL SECTIONS OF WEBSITE: PADDING TO SECTIONS ********

//Initialise variables for nav and sections
const sect = document.querySelectorAll('.sect');
const nav = document.querySelector('nav');
const navStyle = getComputedStyle(nav);

//Function to add padding to allow for sticky nav bar, allowing setions headings to be on page when nav links are clicked
function padSection() {
  sect.forEach((section) => {
  section.style.paddingTop = navStyle.height;
  section.style.paddingBottom = navStyle.height;
  })
}

//Event Listeners to update section padding on window load and resize
window.addEventListener('resize', padSection);
window.addEventListener('load', padSection);




// ******** CAROUSEL SECTION OF WEBSITE ********

// ******** Variables ******** 

//Initialise carousel-deck of slides in JS - x2 (landscape and portrait)
const deck = document.getElementById('carousel__deck-landscape');
const deckP = document.getElementById('carousel__deck-portrait');

//Initialise an array of all slides from the deck - x2 (landscape and portrait)
const slidesArr = Array.from(deck.children);
const slidesArrP = Array.from(deckP.children);

//Initialise current slide - x2 (landscape and portrait)
let currentSlide = deck.querySelector('.current-slide');
let currentSlideP = deckP.querySelector('.current-slide');

//Initialise navigation dots div
const navDots = document.getElementById('dots');

//Initialise an array of all nav dots
const dotsArr = Array.from(navDots.children);

//Initialise current nav dot
let currentDot = navDots.querySelector('.current-dot');

//Initialise individual arrows
const prevArrow = document.getElementById("carouselPrevArrow");
const nextArrow = document.getElementById("carouselNextArrow");

//Initilise a variable for pop up span element for slide 3
const pop = document.getElementById('popup');

//Iniitalise a variable for slide 3 img element itself
const slide3 = document.getElementById('slide3');
const slideP3 = document.getElementById('slideP3');

//Initialise carousel control button
const controlButton = document.getElementById('play-pause');

//Declare a variable for the slide being targeted, to move to - x2 (landscape and portrait)
let targetSlide;
let targetSlideP;

//Declare variable for the distance to targetSide (or currentSlide on resize) - x2 (landscape and portrait)
let dist;
let distP;

//Declare a variable ready for set interval method on 'play' button pushed
let slideInterval;

//Get width of individual slides and initialise as a variable (number) - x2 (landscape and portrait)
let slideWidth = slidesArr[0].getBoundingClientRect().width;
let slideWidthP = slidesArrP[0].getBoundingClientRect().width;

// ******** Functions ******** 

//Functions to spread out the slide decks in a line (i.e. instead of on top of each other now position = absolute)
function spreadDeck() {
  slidesArr.forEach((slide, index) => {
  slide.style.left = slideWidth * index + "px";
  });
  slidesArrP.forEach((slide, index) => {
  slide.style.left = slideWidthP * index + "px";
  });
}

//Function to move target slide into the carousel viewer
function viewTargetSlide() {
  dist = targetSlide.style.left;
  distP = targetSlideP.style.left;
  //confirm timed transition used when shuffling with viewTargetSlide function
  deck.style.transitionDuration = '500ms';
  deckP.style.transitionDuration = '500ms';
  //shuffle to target slide...
  deck.style.transform = 'translateX(-' + dist + ')';
  deckP.style.transform = 'translateX(-' + distP + ')';
  //update currentSlide
  currentSlide.classList.remove('current-slide');
  currentSlideP.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  targetSlideP.classList.add('current-slide');
  currentSlide = deck.querySelector('.current-slide');
  currentSlideP = deckP.querySelector('.current-slide');
  //update currentDot
  currentDot.classList.remove("current-dot");
  targetIndex = slidesArr.findIndex(slide => slide === currentSlide);
  currentDot = dotsArr[targetIndex];
  currentDot.classList.add("current-dot");
  //Hide prev arrow on first slide, next arrow on last
  //update control button to catch if using nav dots and not controlButton Listener
  if (currentSlide === slidesArr[slidesArr.length-1]){
    nextArrow.classList.add("hidden");
    prevArrow.classList.remove("hidden");
    controlButton.innerHTML="Play";
    controlButton.classList.add("pause");
  }
  else if(currentSlide === slidesArr[0]){
    prevArrow.classList.add("hidden");
    nextArrow.classList.remove("hidden");
  }
  else{
    prevArrow.classList.remove("hidden");
    nextArrow.classList.remove("hidden");
  }
  if(currentSlide === slidesArr[2]) {
    pop.style.visibility = "visible";
  }
  else {
    pop.style.visibility = "hidden"
  }
}

//Function to setInterval method to 'play' through slides at 3 sec interval
function playSlides() {
  slideInterval = setInterval(() => {
    //Change target slide if not at end of deck
    if(currentSlide !== slidesArr[slidesArr.length-1]) {
      targetSlide = currentSlide.nextElementSibling;
      targetSlideP = currentSlideP.nextElementSibling;
      //Run function to view target slide
      viewTargetSlide();
    }
    //Or exit method and change button to prompt 'play'
    else {
      pauseSlides();
      return;
    }
  }, 4500)
}

//Function to clear('pause') setInterval method
const pauseSlides = () => clearInterval(slideInterval);

//Function to 'play' or 'pause' slides when controlButton is clicked
function playPause(){
  controlButton.classList.toggle("pause");
  //Play slides from current position, return to start, or pause
  if(!controlButton.classList.contains("pause") && currentSlide !== slidesArr[slidesArr.length-1]){
    controlButton.innerHTML = "Pause";
    targetSlide = currentSlide.nextElementSibling;
    targetSlideP = currentSlideP.nextElementSibling;
    playSlides();
  }
  else if (!controlButton.classList.contains("pause") && currentSlide == slidesArr[slidesArr.length-1]) {
    controlButton.innerHTML = "Pause";
    targetSlide = slidesArr[0];
    targetSlideP = slidesArrP[0];
    viewTargetSlide();
    targetSlide = slidesArr[1];
    targetSlideP = slidesArrP[1];
    playSlides();
  }
  else {
    controlButton.innerHTML = "Play";
    pauseSlides();
  }
}

//Function to toggle bewteen slide 3 (prototype version) and slide 3b (class version)
function togglePop() {
  if(pop.innerHTML === "Click here to add 'class' to slide 3!"){
      pop.innerHTML = "Click here for the 'prototype' slide 3!";
      slide3.src = "slides/Slide3b.png";
      slideP3.src = "slides/SlideP3b.png";
  }
  else {
      pop.innerHTML = "Click here to add 'class' to slide 3!"
      slide3.src = "slides/Slide3.png";
      slideP3.src = "slides/SlideP3a.png";
  }
}

// ******** Event Listeners ******** 

spreadDeck();

//Play or Pause with control button is clicked
controlButton.addEventListener('click', playPause);

//Identify target slide as next in the deck when the right arrow is clicked, then view target
nextArrow.addEventListener('click', () => {
  targetSlide = currentSlide.nextElementSibling;
  targetSlideP = currentSlideP.nextElementSibling;
  viewTargetSlide();
})
//Identify target slide as previous in the deck when the right arrow is clicked, then view Target
prevArrow.addEventListener('click', () => {
  targetSlide = currentSlide.previousElementSibling;
  targetSlideP = currentSlideP.previousElementSibling;
  viewTargetSlide();
})

//Identify target slide as previous/next in the deck when the left/right keys are pressed
document.addEventListener('keydown', (e) => {
  //console.log(e.keyCode);
  if(tModal.style.display != "block") {
    if(e.keyCode === 37) {
      if(currentSlide !== slidesArr[0]) {
        targetSlide = currentSlide.previousElementSibling;
        targetSlideP = currentSlideP.previousElementSibling;
        viewTargetSlide();
      }
    }
    else if(e.keyCode === 39){
      if(currentSlide !== slidesArr[slidesArr.length-1]) {
        targetSlide = currentSlide.nextElementSibling;
        targetSlideP = currentSlideP.nextElementSibling;
        viewTargetSlide();
      }
    }
  }
})

//Identify target slide when navigation dots are clicked
navDots.addEventListener('click', (e) => {
  const clickedDot = e.target.closest('.dot');
  if(!clickedDot) {
    return
  }
  else {
    targetIndex = dotsArr.findIndex(dot => dot === clickedDot);
    targetSlide = slidesArr[targetIndex];
    targetSlideP = slidesArrP[targetIndex];
    viewTargetSlide();
  }
})

//Event listener to toggle between slides 3 and 3b when pop up is clicked
pop.addEventListener('click', togglePop);

//When window resizes, resize distance between target slides to resolve bug
window.onresize = () => {
  /*updated previous version (that used location reload)..
  ...by recalculating dist to current slide and transitioning with no delay
  ...better than location reload, which refreshed to first slide each time*/
  slideWidth = slidesArr[0].getBoundingClientRect().width;
  slideWidthP = slidesArrP[0].getBoundingClientRect().width;
  spreadDeck();
  dist = currentSlide.style.left;
  distP = currentSlideP.style.left;
  //remove timed transition used when shuffling with viewTargetSlide function
  deck.style.transitionDuration = '0ms';
  deckP.style.transitionDuration = '0ms';
  //shuffle to target slide...
  deck.style.transform = 'translateX(-' + dist + ')';
  deckP.style.transform = 'translateX(-' + distP + ')';
}
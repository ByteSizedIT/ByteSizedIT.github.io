// ******** CAROUSEL SECTION OF WEBSITE ********

//Initialise carousel-deck of slides as object in JS
const deck = document.getElementById('carousel__deck');

//Initialise an array(object) of all slides from the deck
const slidesArr = Array.from(deck.children);

//Initialise current slide as object in JS
let currentSlide = deck.querySelector('.current-slide');

//Initialise navigation dots div as object in JS
const navDots = document.getElementById('dots');

//Initialise an array(object) of all nav dots
const dotsArr = Array.from(navDots.children);

//Initialise current nav dot as object in JS
let currentDot = navDots.querySelector('.current-dot');

//Initialise individual arrows as objects in JS
const prevArrow = document.querySelector(".carousel__arrows--prev");
const nextArrow = document.querySelector(".carousel__arrows--next");

//Initialise carousel control button as object in JS
const controlButton = document.getElementById('play-pause');

//Declare a variable for the slide being targeted, to move to
let targetSlide;

//Declare variable for the distance to targetSide (or currentSlide on resize)
let dist;

//Declare a variable ready for set interval method on 'play' button pushed
let slideInterval;

//Get width of individual slides and initialise as a variable (number)
let slideWidth = slidesArr[0].getBoundingClientRect().width;

//Spread out the deck of slides in a line
//(i.e. instead of on top of each other now position = absolute)

const positionSlide = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}
slidesArr.forEach(positionSlide);

//When window resizes, resize distance between target slides to resolve bug
window.onresize = () => {
  //updated previous version (that used location reload)..
  //..by recalculating dist to current slide and transitioning with no delay
  //better than location reload, which refreshed to first slide each time
  slideWidth = slidesArr[0].getBoundingClientRect().width;
  slidesArr.forEach(positionSlide);
  dist = currentSlide.style.left;
  //remove timed transition used when shuffling with viewTargetSlide function
  deck.style.transitionDuration = '0ms';
  //shuffle to target slide...
  deck.style.transform = 'translateX(-' + dist + ')';
}

//Function to move target slide into the carousel viewer
const viewTargetSlide = (targetSlide) => {
  dist = targetSlide.style.left;
  //confirm timed transition used when shuffling with viewTargetSlide function
  deck.style.transitionDuration = '500ms';
  //shuffle to target slide...
  deck.style.transform = 'translateX(-' + dist + ')';
  //update currentSlide
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  currentSlide = deck.querySelector('.current-slide');
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
}

//Function to setInterval method to 'play' through slides at 3 sec interval
const playSlides = () => {
  slideInterval = setInterval(() => {
    //Change target slide if not at end of deck
    if(currentSlide !== slidesArr[slidesArr.length-1]) {
      targetSlide = currentSlide.nextElementSibling;
      //Run function to view target slide
      viewTargetSlide(targetSlide);
    }
    //Or exit method and change button to prompt 'play'
    else {
      pauseSlides();
      return;
    }
  }, 3000)
}

//Function to clear('pause') setInterval method
const pauseSlides = () => clearInterval(slideInterval);

//Toggle between 'play' and 'pause' slides when controlButton is clicked
controlButton.addEventListener('click', () => {
  controlButton.classList.toggle("pause");
//Play slides from current position, return to start, or pause
  if(!controlButton.classList.contains("pause") && currentSlide !== slidesArr[slidesArr.length-1]){
    controlButton.innerHTML = "Pause";
    targetSlide = currentSlide.nextElementSibling;
    playSlides();
  }
  else if (!controlButton.classList.contains("pause") && currentSlide == slidesArr[slidesArr.length-1]) {
    controlButton.innerHTML = "Pause";
    targetSlide = slidesArr[0];
    viewTargetSlide(targetSlide);
    targetSlide = slidesArr[1];
    playSlides();
  }
  else {
    controlButton.innerHTML = "Play";
    pauseSlides();
  }
})

//Identify target slide as next in the deck when the right arrow is clicked
nextArrow.addEventListener('click', () => {
  targetSlide = currentSlide.nextElementSibling;
  //Run function to view target slide
  viewTargetSlide(targetSlide);
})

//Identify target slide as previous in the deck when the right arrow is clicked
prevArrow.addEventListener('click', () => {
  targetSlide = currentSlide.previousElementSibling;
  //Run function to view target slide
  viewTargetSlide(targetSlide);
})

//Identify target slide as previous/next in the deck when the left/right keys are pressed
document.addEventListener('keydown', (e) => {
  //console.log(e);
  //console.log(e.keyCode);
  if(e.keyCode === 37) {
    targetSlide = currentSlide.previousElementSibling;
    //Run function to view target slide
    viewTargetSlide(targetSlide);
  }
  else if(e.keyCode === 39){
    targetSlide = currentSlide.nextElementSibling;
    //Run function to view target slide
    viewTargetSlide(targetSlide);
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
    viewTargetSlide(targetSlide);
  }
})


// ******** WHY ME? SECTION OF WEBSITE ********

// Initialise the modal elements as variables in JS
const modal = document.getElementById("myModal");
const calc = document.getElementById('calculator');
const open = document.getElementById("openModal");
const close = document.getElementById("closeModal");
const calcul = document.getElementById('calculation');
const calculVal = document.getElementById('calculation__value');
const out = document.getElementById('output');
const outVal = document.getElementById('output__value');
const keyboard = document.getElementById('keyboard');
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const blanks = document.getElementsByClassName("blank");

// When the user clicks 'here' text, open the modal
open.addEventListener('click', () => {
  modal.style.display = "block";
})

// When the user clicks on close (x), close the modal
close.addEventListener('click', () => {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

// Function to resize modal elsements based on Viewer Width if window height>width
// or base modal element sizes on Viewer Height if width>height
const resizeCalc = () => {
  if (window.innerHeight>window.innerWidth){
    modal.style.paddingTop = "10vw";
    calc.style.height = "80vw";
    calc.style.width = "50vw";
    close.style.fontSize = "2vw";
    close.style.paddingLeft = "2vw";
    calcul.style.height = "4vw";
    calcul.style.paddingTop = "2vw";
    calcul.style.fontSize = "3vw";
    calculVal.style.padding = "0vw 6vw";
    out.style.height = "10vw";
    out.style.fontSize = "6vw";
    outVal.style.padding = "0vw 6vw";
    keyboard.style.height = "60vw";
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].style.height = "8vw";
      numbers[i].style.width = "8vw";
      numbers[i].style.margin = "2vw";
      numbers[i].style.fontSize = "3vw";
    }
    for (let i = 0; i < operators.length; i++) {
      operators[i].style.height = "8vw";
      operators[i].style.width = "8vw";
      operators[i].style.margin = "2vw";
      operators[i].style.fontSize = "3vw";
    }
    for (let i = 0; i < blanks.length; i++) {
      blanks[i].style.height = "8vw";
      blanks[i].style.width = "8vw";
      blanks[i].style.margin = "2vw";
      blanks[i].style.fontSize = "3vw";
    }
  }
  else {
    modal.style.paddingTop = "10vh";
    calc.style.height = "80vh";
    calc.style.width = "50vh";
    close.style.fontSize = "2vh";
    close.style.paddingLeft = "2vh";
    calcul.style.height = "4vh";
    calcul.style.paddingTop = "2vh";
    calcul.style.fontSize = "3vh";
    calculVal.style.padding = "0vh 6vh";
    out.style.height = "10vh";
    out.style.fontSize = "6vh";
    outVal.style.padding = "0vh 6vh";
    keyboard.style.height = "60vh";
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].style.height = "8vh";
      numbers[i].style.width = "8vh";
      numbers[i].style.margin = "2vh";
      numbers[i].style.fontSize = "3vh";
    }
    for (let i = 0; i < operators.length; i++) {
      operators[i].style.height = "8vh";
      operators[i].style.width = "8vh";
      operators[i].style.margin = "2vh";
      operators[i].style.fontSize= "3vh";
    }
    for (let i = 0; i < blanks.length; i++) {
      blanks[i].style.height = "8vh";
      blanks[i].style.width = "8vh";
      blanks[i].style.margin = "2vh";
      blanks[i].style.fontSize = "3vh";
    }
  }
}

//Call function to resize modal/calculator elements on browser refresh or resize
window.addEventListener('load', resizeCalc());
window.addEventListener('resize', resizeCalc());

//Initialise carousel-deck of slides as object in JS, and slides as an array
const deck = document.getElementById('carousel__deck');

//Initialise an array(object) of all slides from the deck
const slidesArr = Array.from(deck.children);

//Initialise current slide as object in JS
let currentSlide = deck.querySelector('.current-slide');

//initialise individual arrows as objects in JS
const prevArrow = document.querySelector(".carousel__arrows--prev");
const nextArrow = document.querySelector(".carousel__arrows--next");

//Initialise carousel control button as object in JS
const controlButton = document.getElementById('play-pause');

//Declare a variable for the slide being targeted, to move to
let targetSlide;

//Declare a variable ready for set interval method on 'play' button pushed
let slideInterval;

//Get width of individual slides and initialise as a variable (number)
const slideWidth = slidesArr[0].getBoundingClientRect().width;

//Spread out the deck of slides in a line
//(i.e. instead of on top of each other now position = absolute)

const positionSlide = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}
slidesArr.forEach(positionSlide);

//Function to move target slide into the carousel viewer
const viewTargetSlide = (targetSlide) => {
  dist = targetSlide.style.left;
  //shuffle to target slide...
  deck.style.transform = 'translateX(-' + dist + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  currentSlide = deck.querySelector('.current-slide');
  if (currentSlide === slidesArr.length[-1]){
    controlButton.innerHTML="Play";
    controlButton.classList.add("play");
  }
}

//Function to setInterval method to 'play' through slides at 3 sec interval
const playSlides = () => {
  slideInterval = setInterval(() => {
      //Run function to view target slide
      viewTargetSlide(targetSlide);
      //Change target slide if not at end of deck
      if(currentSlide != slidesArr[slidesArr.length-1]) {
        targetSlide = currentSlide.nextElementSibling;
      }
      //Or exit method and change button to prompt 'play'
      else {
        controlButton.innerHTML="Play";
        return;
      }
    //}
  }, 3000)
}

//Function to clear('pause') setInterval method
const pauseSlides = () => clearInterval(slideInterval);

//Toggle between 'play' and 'pause' slides when controlButton is clicked
controlButton.addEventListener('click', () => {
  controlButton.classList.toggle("play");
//Play slides from current position, return to start, or pause
  if(controlButton.classList.contains("play") && currentSlide !== slidesArr[slidesArr.length-1]){
    targetSlide = currentSlide.nextElementSibling;
    playSlides();
    controlButton.innerHTML = "Pause";
  }
  else if (controlButton.classList.contains("play") && currentSlide === slidesArr[slidesArr.length-1]) {
    targetSlide = slidesArr[0];
    viewTargetSlide(targetSlide);
    controlButton.innerHTML = "Pause";
    targetSlide = slidesArr[1];
    playSlides();
  }
  else {
    pauseSlides();
    controlButton.innerHTML = "Play";
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

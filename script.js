//Initialise carousel-deck of slides as object in JS
const deck = document.getElementById('carousel__deck');

//Initialise an array(object) of all slides from the deck
const slidesArr = Array.from(deck.children);

//Initialise current slide as object in JS
let currentSlide = deck.querySelector('.current-slide');

//Initialise individual arrows as objects in JS
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
  //update currentSlide
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  currentSlide = deck.querySelector('.current-slide');
  if (currentSlide === slidesArr[slidesArr.length-1]){
    controlButton.innerHTML="Play";
    controlButton.classList.add("pause");
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
    //targetSlide = slidesArr[1];
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

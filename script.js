//Initialise carousel-deck of slides as object in JS, and slides as an array
const deck = document.getElementById('carousel__deck');

//Initialise an array(object) of all slides from the deck
const slidesArr = Array.from(deck.children);

//initialise current slide as object in JS?/
let currentSlide = deck.querySelector('.current-slide');

//initialise individual arrows as objects in JS
const prevArrow = document.querySelector(".carousel__arrows--prev");
const nextArrow = document.querySelector(".carousel__arrows--next");

//Declare a variable for the slide being targeted, to move to
let targetSlide;

//get width of individual slides and initialise as a variable (number)
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
}

setInterval(() => {
  targetSlide = currentSlide.nextElementSibling;
  //Run function to view target slide
  //viewTargetSlide(targetSlide);
}, 3000)

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

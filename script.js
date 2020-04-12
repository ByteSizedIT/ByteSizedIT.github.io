//Initialise carousel-deck of slides as object in JS, and slides as an array
const deck = document.getElementById('carousel__deck');

//Put all slides from the deck in an array(object)
const slidesArr = Array.from(deck.children);

//initialise individual arrows as objects in JS
const prevArrow = document.querySelector(".carousel__arrows--prev");
const nextArrow = document.querySelector(".carousel__arrows--next");

//get width of individual slides and initialise as a variable (number)
const slideWidth = slidesArr[0].getBoundingClientRect().width;

//Spread out the deck of slides in a line
//(i.e. instead of on top of each other now position = absolute)

const positionSlide = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}
slidesArr.forEach(positionSlide);

//Move line to the left when right arrow is clicked
//sense click...
nextArrow.addEventListener('click', () => {
  //initiate variables
  const currentSlide = deck.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const dist = nextSlide.style.left;
  //shuffle to slide on right...
  deck.style.transform = 'translateX(-' + dist + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
})

//Move line to the right when the left arrow is clicked
//sense click...
prevArrow.addEventListener('click', () => {
  //initiate variables
  const currentSlide = deck.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const dist = prevSlide.style.left;
  //shuffle to slide on left...
  deck.style.transform = 'translateX(-' + dist + ')';
  currentSlide.classList.remove('current-slide');
  prevSlide.classList.add('current-slide');
})

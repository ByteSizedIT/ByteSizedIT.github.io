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

// Initialise modal elements as variables in JS
const modal = document.getElementById("myModal");
const open = document.getElementById("openModal");
const close = document.getElementById("closeModal");

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

// Initialise calculator elements as variables in JS
let calculation = document.getElementById("calculation__value");
let output = document.getElementById("output__value");

// Declare variables to hold values/data when calculating input to calculation and output elements
let calcData;
let outputData

// Declare variable to indicate whether equals was last button pressed
let sumDone

// Initialise an array of number buttons
const numbers = document.getElementsByClassName("number");

//Initialise an array of operator buttons
const operators = document.getElementsByClassName("operator");

// Function to transform num into comma seperated number, for displaying (setOutput)
function formatNum(num) {
  const f = Number(num);
  return f.toLocaleString("en");
}

// Function to transfomr comma seperated number in to non-comma seperated, for ????????????
function unformatNum(num) {
  return Number(num.replace(/,/g,""));
}

// Getter and setter functions for 'calculation' string value
function getCalculation() {
  return calculation.innerText;
}

function setCalculation(val) {
  calculation.innerText = val;
}

// Getter and setter functions for calculator 'output' number value
function getOutput() {
  return output.innerText;
}

function setOutput(val) {
  output.innerText = formatNum(val);
}

// Append to output value when a number button is pressed
for(let i=0; i<numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    outputData = unformatNum(getOutput());
    if(isNaN(outputData)) { // Lines to remove initial emoji value etc
      outputData = 0;
      setCalculation("");
    }
    if (sumDone = true) {
      outputData = this.id;
      setOutput(outputData);
    }
    else {
    outputData = outputData + this.id;
    setOutput(outputData);
    }
  })
}

//
for(let i=0; i<operators.length; i++) {
  operators[i].addEventListener('click', function() {

    if (this.id == "clear") {
      setCalculation("");
      setOutput("");
    }

    else if (this.id == "CE") {
    outputData = unformatNum(getOutput()).toString(); //remove commas and convert to string
    outputData = outputData.substring(0, outputData.length-1);
      if(isNaN(outputData)) { // Lines to remove initial emoji value etc
        outputData = 0;
        setCalculation("");
      }
    setOutput(outputData);
    }

    else {
      outputData = getOutput();
      calcData = getCalculation();
      if(isNaN(outputData)) { // Lines to remove initial emoji value etc
        setCalculation("0"+this.id);
        output.innerText = "";
      }

      else if (outputData!="") {
        outputData = unformatNum(outputData);
        calcData = calcData + outputData;
        if (this.id == "=") {
          let result = eval(calcData);
          setOutput(result);
          setCalculation("");
        }
        else {
          calcData = calcData + this.id;
          setCalculation(calcData);
          output.innerText = "";
        }
      }
    }
  })
}

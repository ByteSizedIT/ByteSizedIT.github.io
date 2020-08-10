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


// ******** WHY CODING? SECTION OF WEBSITE ********

//Initialise `Google 'empty' (X) buttton and 'search box' as objects in JS
const empty = document.getElementById('empty');
const searchBox = document.getElementById('text');

//Make the 'empty' button (X) appear in Google Search page's text box (when text is entered)
function toggleEmpty() {
    if(searchBox.value === "") {
        empty.style.visibility = "hidden";
        action.style.action = "";
    }
    else {
        empty.style.visibility = "visible";
    }
}

searchBox.addEventListener("keyup", toggleEmpty);

//Make the text in the Google Search page's text box disappear when the 'empty' button (X) is pressed
empty.addEventListener("click", () => searchBox.value = "");


// ******** WHY ME? SECTION OF WEBSITE ********

// Initialise calculator modal elements as variables in JS
const cModal = document.getElementById("cModal");
const openCalc = document.getElementById("openCalc");
const closeCalc = document.getElementById("closeCalc");

// When the user clicks 'here' text, open the calculator modal
openCalc.addEventListener('click', () => {
  cModal.style.display = "block";
})

// When the user clicks on close (x), close the calculator modal
closeCalc.addEventListener('click', () => {
  cModal.style.display = "none";
})

// When the user clicks anywhere outside of the calculator modal, close it
window.addEventListener('click', (e) => {
  if (e.target == cModal) {
    cModal.style.display = "none";
  }
})

// Initialise calculator elements as variables in JS
let calculation = document.getElementById("calculation__value");
let output = document.getElementById("output__value");

// Declare variables to hold values/data when calculating input to calculation and output elements
let calcData;
let outputData

// Declare variable to indicate whether equals was last button pressed
let sumDone = false;

// Initialise an array of number buttons
const numbers = document.getElementsByClassName("number");

//Initialise an array of operator buttons
const operators = document.getElementsByClassName("operator");

// Function to transform num into comma seperated number, for displaying (setOutput)
function formatNum(num) {
  const f = Number(num);
  return f.toLocaleString("en");
}

// Function to transform comma seperated number in to non-comma seperated
function unformatNum(num) {
  return Number(num.replace(/,/g,""));
}

// Functions to get/set 'calculation' string value
function getCalculation() {
  return calculation.innerText;
}

function setCalculation(val) {
  calculation.innerText = val;
}

// Functions to get/set calculator 'output' number value
function getOutput() {
  return output.innerText;
}

function setOutput(val) {
  output.innerText = formatNum(val);
}

// Create listeners to append a number to output value when a number button is pressed
for(let i=0; i<numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    outputData = unformatNum(getOutput());
    if(isNaN(outputData)) { // Lines to remove initial emoji value etc
      outputData = 0;
      setCalculation("");
    }
    if (sumDone == true) {
      outputData = this.id;
      setOutput(outputData);
      sumDone = false;
    }
    else {
    outputData = outputData + this.id;
    setOutput(outputData);
    }
  })
}

// Create listeners to respond to operators being pressed
for(let i=0; i<operators.length; i++) {
  operators[i].addEventListener('click', function() {

    if (this.id == "clear") {
      setCalculation("");
      setOutput("");
    }

    else if (this.id == "CE") {
    outputData = unformatNum(getOutput()).toString(); //remove commas and convert to string
    outputData = outputData.substring(0, outputData.length-1);
      if(isNaN(outputData)) { // lines to remove initial emoji value etc
        outputData = 0;
        setCalculation("");
      }
    setOutput(outputData);
    }

    else {
      outputData = getOutput();
      calcData = getCalculation();
      if(isNaN(outputData)) { // lines to remove initial emoji value etc
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
          sumDone = true;
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


// Initialise Tetris modal elements as variables in JS

const tModal = document.getElementById("tModal");
const openTetris = document.getElementById("lego");
const closeTetris = document.getElementById("closeTet");

// When the user clicks 'here' text, open the calculator modal
openTetris.addEventListener('click', () => {
  tModal.style.display = "block";
})

// When the user clicks on close (x), close the calculator modal
closeTetris.addEventListener('click', () => {
  tModal.style.display = "none";
})

// When the user clicks anywhere outside of the calculator modal, close it
window.addEventListener('click', (e) => {
  if (e.target == tModal) {
    tModal.style.display = "none";
  }
})


// Inititialise Tetris game variables

const startBtn = document.getElementById('start-button');

const score = document.getElementById('score');
let points = 0;

const grid = document.getElementById('grid');
const gridBase = document.getElementById('grid-base');

const nextGrid = document.getElementById('next-grid');

const width = 10;
const nextWidth = 4;

// Function to create/append a div as child element of another (parent) div(divName)
// ...adding classA and classB to the the child div that has been created
function appendDiv(divName, classA, classB) {
  let div = document.createElement('div');
  if(classA){
    div.classList.add(classA);
  }
  if(classB){
    div.classList.add(classB);
  }
  divName.appendChild(div);
}

// Function to append given number of divs (squares) to parent div
//..with the named class(es) associated
function generateSquares(number, divName, classA, classB) {
  for(let i=0; i<number; i++) {
    appendDiv(divName, classA, classB);
  }
}

// Run function above to generate squares for game grid, gridBase and preview grid
generateSquares(200, grid, 'square');
generateSquares(10, gridBase, 'square', 'frozen');

generateSquares(16, nextGrid, 'next-square');

// Create Array of all sqaures on game grid
let squaresArr = Array.from(document.getElementsByClassName('square'));

//Create Array of all sqaures on preview grid
let nextArr = Array.from(document.getElementsByClassName('next-square'));


// Create Tetriminoes to be used on main grid - array for each, containing 4 diff rotations
const lType = [[1, width+1, width*2+1, 2], [width, width+1, width+2, width*2+2], [1, width+1, width*2+1, width*2], [width, width*2, width*2+1, width*2+2]];
const zType = [[0, width, width+1, width*2+1], [width+1, width+2, width*2, width*2+1], [0, width, width+1, width*2+1], [width+1, width+2, width*2, width*2+1]];
const tType = [[1, width, width+1, width+2], [1, width+1, width+2, width*2+1], [width, width+1, width+2, width*2+1], [1, width, width+1, width*2+1]];
const oType = [[0, 1, width, width+1], [0, 1, width, width+1], [0, 1, width, width+1], [0, 1, width, width+1]];
const iType = [[1, width+1, width*2+1, width*3+1], [width, width+1, width+2, width+3], [1, width+1, width*2+1, width*3+1], [width, width+1, width+2, width+3]];

// Create array of all 5 Tetriminoes to be used on main grid, with each one containing own array of 4 rotations)
const tetArr = [lType, zType, tType, oType, iType];


// Create Tetriminoes to be used on the preview grid - array for each, containing 4 diff rotations
const lTypeNext = [[1, nextWidth+1, nextWidth*2+1, 2], [nextWidth, nextWidth+1, nextWidth+2, nextWidth*2+2], [1, nextWidth+1, nextWidth*2+1, nextWidth*2], [nextWidth, nextWidth*2, nextWidth*2+1, nextWidth*2+2]];
const zTypeNext = [[0, nextWidth, nextWidth+1, nextWidth*2+1], [nextWidth+1, nextWidth+2, nextWidth*2, nextWidth*2+1], [0, nextWidth, nextWidth+1, nextWidth*2+1], [nextWidth+1, nextWidth+2, nextWidth*2, nextWidth*2+1]];
const tTypeNext = [[1, nextWidth, nextWidth+1, nextWidth+2], [1, nextWidth+1, nextWidth+2, nextWidth*2+1], [nextWidth, nextWidth+1, nextWidth+2, nextWidth*2+1], [1, nextWidth, nextWidth+1, nextWidth*2+1]];
const oTypeNext = [[0, 1, nextWidth, nextWidth+1], [0, 1, nextWidth, nextWidth+1], [0, 1, nextWidth, nextWidth+1], [0, 1, nextWidth, nextWidth+1]];
const iTypeNext = [[1, nextWidth+1, nextWidth*2+1, nextWidth*3+1], [nextWidth, nextWidth+1, nextWidth+2, nextWidth+3], [1, nextWidth+1, nextWidth*2+1, nextWidth*3+1], [nextWidth, nextWidth+1, nextWidth+2, nextWidth+3]];

// Create array of all 5 Tetriminoes to be used on the preview grid, with each one containing own array of 4 rotations)
const tetArrNext = [lTypeNext, zTypeNext, tTypeNext, oTypeNext, iTypeNext];


// Create variables and function to select Next(preview) Tetrimino and Current Tetrimino
let nextType;
let nextRotation;

let nextTet = [];

let currType;
let currentRotation;
let ifRotated;

let currentTet = [];

function nextTetrimino() {
  nextType = Math.floor(Math.random()*tetArr.length);
  nextRotation = Math.floor(Math.random()*4);
  nextTet = tetArrNext[nextType][nextRotation];
}

// Function to draw the nextTetrimino
function drawNext() {
  nextTet.forEach(index => nextArr[index].classList.add("tetrimino"));
}

//Function to undraw the nextTetrimino
function undrawNext() {
  nextTet.forEach(index => nextArr[index].classList.remove("tetrimino"));
}

//Function to create a new Tetrimo for the main grid, copied from preview grid
let currentPosition;

//Function to draw the initial rotation of a Tetrimino i.e. currentTet
function draw() {
  currentTet.forEach(index => squaresArr[currentPosition+index].classList.add("tetrimino"))
}

//Function to undraw the currentTetrimino
function undraw() {
  currentTet.forEach(index => squaresArr[currentPosition+index].classList.remove("tetrimino"))
}

function newTetrimino() {
  currType = nextType;
  currentRotation = nextRotation;
  ifRotated = (currentRotation + 1)%currType.length;
  currentTet = tetArr[nextType][nextRotation];
  currentPosition = 4;
  undrawNext();
  nextTetrimino();
  drawNext();
  draw();
}

//Start/Pause button functionality
startBtn.addEventListener("click", () => {
  points = 0;
  score.innerHTML = points;
  undraw();
  undrawNext();
  nextTetrimino();
  newTetrimino();
})

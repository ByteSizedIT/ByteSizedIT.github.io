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
  if(tModal.style.display != "block") {
    if(e.keyCode === 37) {
      if(currentSlide !== slidesArr[0]) {
        targetSlide = currentSlide.previousElementSibling;
        //Run function to view target slide
        viewTargetSlide(targetSlide);
      }
    }
    else if(e.keyCode === 39){
      if(currentSlide !== slidesArr[slidesArr.length-1]) {
        targetSlide = currentSlide.nextElementSibling;
        //Run function to view target slide
        viewTargetSlide(targetSlide);
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

// Initialse variable with the date of next Founders and Coders course
const courseDate = new Date("Mar 3, 2021 09:45:00").getTime();

let days;
let hours;
let minutes;
let seconds;

const countDown = setInterval(() => {

  // Initialise variable with today's date and time
  const now = new Date().getTime();

  // Initialise variable with timeframe from now until count down date
  const timeframe = courseDate - now;

  //  Calculate days, hours, minutes and seconds
  days = Math.floor(timeframe / (1000 * 60 * 60 * 24));
  hours = Math.floor((timeframe % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((timeframe % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((timeframe % (1000 * 60)) / 1000);

  // If timeframe is positive numer
  if (timeframe > 0) {
    // Output days, hours, mins, secs to course in html element with id="cdTimer"
    document.getElementById("preTimer").innerHTML = "Countdown to Founders & Coders Spring 2021: ";
    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    document.getElementById("postTimer").style.display = "none";
  }
  else {
    // Output days, hours, mins, secs to course in html element with id="cdTimer"
    document.getElementById("preTimer").innerHTML = "Time since Founders & Coders Spring 2021 started: ";
    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    document.getElementById("postTimer").style.display = "block";
  }
}, 1000);




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





// ******** PREREQUISITES SECTION OF WEBSITE ********

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
  pauseGame();
  tModal.style.display = "none";
})

// When the user clicks anywhere outside of the calculator modal, close it
window.addEventListener('click', (e) => {
  if (e.target == tModal) {
    pauseGame();
    tModal.style.display = "none";
  }
})

// Inititialise Tetris game variables

const startBtn = document.getElementById('start-button');

const score = document.getElementById('score');
let points = 0;


// Add event listener to assign value from local storage variable to highscore
const highScore = document.getElementById('high-score');
document.addEventListener('DOMContentLoaded', () => {
  localStorage.getItem('highScore')? highScore.innerHTML = localStorage.getItem('highScore'): highScore.innerHTML = 0;
})

const grid = document.getElementById('grid');
const gridBase = document.getElementById('grid-base');

const nextGrid = document.getElementById('next-grid');

const gridWidth = 10;
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
generateSquares(10, gridBase, 'baseSquare', 'frozen');

generateSquares(16, nextGrid, 'next-square');

// Create Array of all sqaures on game grid
let squaresArr = Array.from(document.getElementsByClassName('square'));
let baseArr = Array.from(document.getElementsByClassName('baseSquare'));
squaresArr = squaresArr.concat(baseArr);

//Create Array of all sqaures on preview grid
let nextArr = Array.from(document.getElementsByClassName('next-square'));


// Create Tetriminoes to be used on main grid - array for each, containing 4 diff rotations
const lType = [[1, gridWidth+1, gridWidth*2+1, 2], [0, 1, 2, gridWidth+2], [1, gridWidth+1, gridWidth*2+1, gridWidth*2], [0, gridWidth, gridWidth+1, gridWidth+2]];
const zType = [[0, gridWidth, gridWidth+1, gridWidth*2+1], [1, 2, gridWidth, gridWidth+1], [0, gridWidth, gridWidth+1, gridWidth*2+1], [1, 2, gridWidth, gridWidth+1]];
const tType = [[1, gridWidth, gridWidth+1, gridWidth+2], [1, gridWidth+1, gridWidth+2, gridWidth*2+1], [0, 1, 2, gridWidth+1], [1, gridWidth, gridWidth+1, gridWidth*2+1]];
const oType = [[0, 1, gridWidth, gridWidth+1], [0, 1, gridWidth, gridWidth+1], [0, 1, gridWidth, gridWidth+1], [0, 1, gridWidth, gridWidth+1]];
const iType = [[1, gridWidth+1, gridWidth*2+1, gridWidth*3+1], [0, 1, 2, 3], [1, gridWidth+1, gridWidth*2+1, gridWidth*3+1], [0, 1, 2, 3]];

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

let currentPosition;

// Create variable to store/identify whether currentTet has another tetrimino below
let atBott = false;

// Create variable to hold interval timing of automated movement downwards
let movementTimer;

// Create variabkle to hold the speed of automated movement downwards
let speed = 1000;

// Create variable to hold boolean value indicating when game over
let gameFinished;

//  Create variable to hold boolean value indicating when game paused
let gamePaused;

function nextTetrimino() {
  nextType = Math.floor(Math.random()*tetArr.length);
  nextRotation = Math.floor(Math.random()*4);
  nextTet = tetArrNext[nextType][nextRotation];
}

// Function to draw the nextTet
function drawNext() {
  nextTet.forEach(index => nextArr[index].classList.add("tetrimino"));
}

// Function to undraw the nextTet
function undrawNext() {
  nextTet.forEach(index => nextArr[index].classList.remove("tetrimino"));
}

// Function to draw the initial rotation of a Tetrimino i.e. currentTet
function draw() {
  currentTet.forEach(index => squaresArr[currentPosition+index].classList.add("tetrimino"))
}

// Function to undraw the currentTetrimino
function undraw() {
  currentTet.forEach(index => squaresArr[currentPosition+index].classList.remove("tetrimino"))
}

// Function to redefine 'current Tetrimino' based on 'next Tetrimino' type and rotation
// ...before selecting a new 'Next Tetrimino and drawing them both
function newTetrimino() {
  currType = nextType;
  currentRotation = nextRotation;
  ifRotated = (currentRotation + 1)%currType.length;
  currentTet = tetArr[nextType][nextRotation];
  currentPosition = 4;
  undrawNext();
  nextTetrimino();
  atBott = false;
  drawNext();
  draw();
  gameOver();
}

function setFrozen() {
  if(currentTet.some(index => squaresArr[currentPosition + index + gridWidth].classList.contains('frozen'))) {
    currentTet.forEach(index => squaresArr[currentPosition + index].classList.add('frozen'));
    completedLines();
    newTetrimino();
  }
  else {
    atBott = false;
  }
}

// Function to freeze movement of currentTetrimino if space below (+gridWidth) is frozen
function freeze() {
  if(currentTet.some(index => squaresArr[currentPosition + index + gridWidth].classList.contains('frozen'))) {
    atBott = true;
    window.setTimeout(() => {setFrozen()}, 400);
  }
}

// Function to move current Tetrimo down
function moveDown() {
  if(!atBott) {
    undraw();
    currentPosition += gridWidth;
    draw();
    freeze();
  }
}

// Functions to confirm space to the left/right of Tetrimino

function spaceLeft(tetrimino) {
  const atLeftBoundary = tetrimino.some(index => (currentPosition + index)%gridWidth === 0);
  const lAdjoiningFrozen = tetrimino.some(index => squaresArr[currentPosition + index - 1].classList.contains('frozen'));
  return (!atLeftBoundary && !lAdjoiningFrozen)? true: false;
}

function spaceRight(tetrimino) {
  const atRightBoundary = tetrimino.some(index => (currentPosition + index)%gridWidth === 9);
  const rAdjoiningFrozen = tetrimino.some(index => squaresArr[currentPosition + index - 1].classList.contains('frozen'));
  return (!atRightBoundary && !rAdjoiningFrozen)? true: false;
}

// Function to move currentTetrimino left
function moveLeft() {
  if (spaceLeft(currentTet)){
    undraw();
    currentPosition -=1;
    draw();
  }
}

// Function to move currentTetrimino right
function moveRight() {
  if (spaceRight(currentTet)){
    undraw();
    currentPosition +=1;
    draw();
  }
}

// Function to rotate currentTetrimino
function rotate() {
  if(spaceLeft(currentTet) && spaceRight(currentTet)) {
    undraw();
    currentRotation ++;
    currentRotation = currentRotation%4;
    currentTet = tetArr[currType][currentRotation];
    draw();
  }
}

// Event listener to run movement functions (down/left/right/down - rotate block)
function keysPressed(e) {
  //prevent keys from moving around underlying page when tetris modal is displayed
  if(tModal.style.display === "block") {
    e.preventDefault();
    if(e.keyCode === 37){
      moveLeft();
    }
    else if (e.keyCode === 39) {
      moveRight();
    }
    else if (e.keyCode === 38) {
      rotate();
    }
    else if (e.keyCode === 40) {
      moveDown();
    }
  }
}

// Function to remove all chilld nodes from a parent element
// ... used in complatedLines function or if starting a new game
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
  }
}

// Function to splice line when complete, deleting classes, then adding it to top of grid
function completedLines() {
  for(let i=0; i<squaresArr.length-10; i+=gridWidth){
    let row = [];
    for(let j=i; j<i+gridWidth; j++){
      row.push(j);
    }
    //const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
    if(row.every(index=>squaresArr[index].classList.contains('frozen'))) {
      row.forEach(index=>squaresArr[index].classList.remove('frozen'));
      row.forEach(index=>squaresArr[index].classList.remove('tetrimino'));
      const squaresRemoved = squaresArr.splice(i,gridWidth);
      squaresArr = squaresRemoved.concat(squaresArr);
      removeAllChildNodes(grid);
      for(let k=0; k<squaresArr.length-10; k++) {
        grid.appendChild(squaresArr[k]);
      }
      addScore();
    }
  }
}

// Function to add points to score, using local storage to maintain highScore
function addScore() {
  points +=10;
  score.innerHTML = points;
  if(points>highScore.innerHTML){
    highScore.innerHTML = points;
    localStorage.setItem('highScore',  points);
  }
  // Increase speed of automatic downward movement every 50 points
  if(speed>250 && points%50===0){
    clearInterval(movementTimer);
    movementTimer = null;
    speed-=50;
    movementTimer = setInterval(moveDown, speed);
  }
}

// Funtion to test whether all squares are frozen/filled, ending the game
function gameOver() {
  if(currentTet.some(index=>squaresArr[index+currentPosition].classList.contains('frozen'))) {
    gameFinished = 1;
    // clear move function to stop auto movement of tetrimino
    clearInterval(movementTimer);
    movementTimer = null;
    // clear event listener for arrow keys being pressed
    document.removeEventListener('keydown', keysPressed);
    startBtn.innerHTML = "New Game";
  }
}

function pauseGame() {
  clearInterval(movementTimer);
  movementTimer = null;
  document.removeEventListener('keydown', keysPressed);
  startBtn.innerHTML = "Resume";
  gamePaused = 1;
}

// Start/Pause button functionality
startBtn.addEventListener("click", () => {
  // If not pausing a game in progress
  if (!movementTimer){

    // If not the first game to be played since opening Tetris modulo
    if (gameFinished) {
      removeAllChildNodes(grid);
      removeAllChildNodes(gridBase);
      generateSquares(200, grid, 'square');
      generateSquares(10, gridBase, 'square', 'frozen');
      squaresArr = Array.from(document.getElementsByClassName('square'));
      gameFinished = 0;
    }
    // If starting any new game (first or otherwise)
    if (!gamePaused){
      points = 0;
      score.innerHTML = points;
      undraw();
      undrawNext();
      nextTetrimino();
      newTetrimino();
      speed = 1000;
    }
    // If unpausing/resuming the game
    else if (gamePaused) {
      gamePaused = 0;
    }

    // Whether starting a new game or resuming one

    // Invoke move function every second to play
    movementTimer = setInterval(moveDown, speed);
    // Start event listener for arrow keys being pressed
    document.addEventListener('keydown', keysPressed);
    startBtn.innerHTML = "Pause";
  }

  // If pausing a game in progress
  else {
    pauseGame();
  }
})





// ******** BYTESIZEDIT SECTION OF WEBSITE ********




// ******** MY ROBOT PROTOTYPE SECTION OF WEBSITE ********

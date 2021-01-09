// ******** PREREQUISITES SECTION OF WEBSITE (TETRIS) ********

// ******** Variables ******** 

// Initialise Tetris modal elements as variables in JS
const tModal = document.getElementById("tModal");
const openTetris = document.getElementById("lego");
const closeTetris = document.getElementById("closeTet");
// Initialise Tetris inplay controls as variables in JS
const tRight = document.getElementById("tetrisRightArrow");
const tLeft = document.getElementById("tetrisLeftArrow");
const tDown = document.getElementById("tetrisDownArrow");
const tSpin = document.getElementById("tetrisSpin");

// Inititialise Tetris game elements as variables in JS
const startBtn = document.getElementById('start-button');

const score = document.getElementById('score');
let points = 0;
const highScore = document.getElementById('high-score');
const highPoints = localStorage.getItem('highScore')? highScore.innerHTML = localStorage.getItem('highScore'): highScore.innerHTML = 0;

const grid = document.getElementById('grid');
const gridBase = document.getElementById('grid-base');
const nextGrid = document.getElementById('next-grid');
const gridWidth = 10;
const nextWidth = 4;

// Create variable to hold interval timing of automated movement downwards
let movementTimer;

// Create variable to hold the speed of automated movement downwards
let speed = 1000;

// Create variable to hold boolean values indicating when game in progress and game paused
let gameOn = false;
let gamePaused = false;

// Create variable to hold interval timing of blinking message (Game Over or Game Paused)
let blinkTimer


// ******** Tetrimino Variables ******** 

//Create Array of all squares on next grid
let nextSquaresArr
let squaresArr;

// Create Tetriminoes to be used on main grid - array for each, containing 4 diff rotations
const lType = [[1, gridWidth+1, gridWidth*2+1, 2], [0, 1, 2, gridWidth+2], [1, gridWidth+1, gridWidth*2+1, gridWidth*2], [0, gridWidth, gridWidth+1, gridWidth+2]];
const zType = [[0, gridWidth, gridWidth+1, gridWidth*2+1], [1, 2, gridWidth, gridWidth+1], [0, gridWidth, gridWidth+1, gridWidth*2+1], [1, 2, gridWidth, gridWidth+1]];
const tType = [[1, gridWidth, gridWidth+1, gridWidth+2], [1, gridWidth+1, gridWidth+2, gridWidth*2+1], [0, 1, 2, gridWidth+1], [1, gridWidth, gridWidth+1, gridWidth*2+1]];
const oType = [[0, 1, gridWidth, gridWidth+1], [0, 1, gridWidth, gridWidth+1], [0, 1, gridWidth, gridWidth+1], [0, 1, gridWidth, gridWidth+1]];
const iType = [[1, gridWidth+1, gridWidth*2+1, gridWidth*3+1], [0, 1, 2, 3], [1, gridWidth+1, gridWidth*2+1, gridWidth*3+1], [0, 1, 2, 3]];

// Create array of all 5 Tetrimino Types to be used on main grid, with each one containing own array of 4 rotations)
const typesArr = [lType, zType, tType, oType, iType];


// Create Tetriminoes to be used on the preview grid - array for each, containing 4 diff rotations
const lTypeNext = [[1, nextWidth+1, nextWidth*2+1, 2], [nextWidth, nextWidth+1, nextWidth+2, nextWidth*2+2], [1, nextWidth+1, nextWidth*2+1, nextWidth*2], [nextWidth, nextWidth*2, nextWidth*2+1, nextWidth*2+2]];
const zTypeNext = [[0, nextWidth, nextWidth+1, nextWidth*2+1], [nextWidth+1, nextWidth+2, nextWidth*2, nextWidth*2+1], [0, nextWidth, nextWidth+1, nextWidth*2+1], [nextWidth+1, nextWidth+2, nextWidth*2, nextWidth*2+1]];
const tTypeNext = [[1, nextWidth, nextWidth+1, nextWidth+2], [1, nextWidth+1, nextWidth+2, nextWidth*2+1], [nextWidth, nextWidth+1, nextWidth+2, nextWidth*2+1], [1, nextWidth, nextWidth+1, nextWidth*2+1]];
const oTypeNext = [[0, 1, nextWidth, nextWidth+1], [0, 1, nextWidth, nextWidth+1], [0, 1, nextWidth, nextWidth+1], [0, 1, nextWidth, nextWidth+1]];
const iTypeNext = [[1, nextWidth+1, nextWidth*2+1, nextWidth*3+1], [nextWidth, nextWidth+1, nextWidth+2, nextWidth+3], [1, nextWidth+1, nextWidth*2+1, nextWidth*3+1], [nextWidth, nextWidth+1, nextWidth+2, nextWidth+3]];

// Create array of all 5 Tetriminoes to be used on the preview grid, with each one containing own array of 4 rotations)
const typesArrNext = [lTypeNext, zTypeNext, tTypeNext, oTypeNext, iTypeNext];


// Create variables and function to represent Next(preview) Tetrimino and Current Tetrimino
let nextType;
let nextRotation;

let nextTet = [];

let currType;
let currentRotation;
let ifRotated;

let currentTet = [];
let currentPosition;


// ******** Grid Set Up Functions ******** 

// Function to create/append a div as child element of another (parent) div (divName)
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

// ******** Tetrimino Functions ******** 

// Function to create the next Tetrimino
function nextTetrimino() {
  nextType = Math.floor(Math.random()*typesArr.length);
  nextRotation = Math.floor(Math.random()*4);
  nextTet = typesArrNext[nextType][nextRotation];
}

// Function to draw the next Tetrimino
function drawNext() {
  nextTet.forEach(index => nextSquaresArr[index].classList.add("tetrimino"));
}

// Function to undraw the next Tetrimino
function undrawNext() {
  nextTet.forEach(index => nextSquaresArr[index].classList.remove("tetrimino"));
}

// Function to define the 'current Tetrimino' based on 'next Tetrimino' type and rotation
// ...before selecting a new 'Next Tetrimino and drawing them both
function newTetrimino() {
  currType = nextType;
  currentRotation = nextRotation;
  currentTet = typesArr[nextType][nextRotation];
  currentPosition = 4;
  undrawNext();
  nextTetrimino();
  atBott = false;
  drawNext();
  draw();
  gameOver();
}

// Function to draw the current Tetrimino
function draw() {
  currentTet.forEach(index => squaresArr[currentPosition+index].classList.add("tetrimino"));
}

// Function to undraw the current Tetrimino
function undraw() {
  currentTet.forEach(index => squaresArr[currentPosition+index].classList.remove("tetrimino"))
}

// Function to freeze current Tetrimino, before checking completed lines and creating a new Tetrimino
function setFrozen() {
  currentTet.forEach(index => squaresArr[currentPosition + index].classList.add('frozen'));
  completedLines();
  newTetrimino();
}

// Function to move current Tetrimo down
function moveDown() {
  if(currentTet.some(index => squaresArr[currentPosition + index + gridWidth].classList.contains('frozen'))) {
    setFrozen();
  }
  else {  
    undraw();
    currentPosition += gridWidth;
    draw();
  }
}

//Functions to confirm space to the left/right of Tetrimino
function spaceLeft() {
  const atLeftBoundary = currentTet.some(index => (currentPosition + index)%gridWidth === 0);
  const lAdjoiningFrozen = currentTet.some(index => squaresArr[currentPosition + index - 1].classList.contains('frozen'));
  return (!atLeftBoundary && !lAdjoiningFrozen)? true: false;
}
function spaceRight() {
  const atRightBoundary = currentTet.some(index => (currentPosition + index)%gridWidth === 9);
  const rAdjoiningFrozen = currentTet.some(index => squaresArr[currentPosition + index + 1].classList.contains('frozen'));
  return (!atRightBoundary && !rAdjoiningFrozen)? true: false;
}

// Functions to move currentTetrimino left/right
function moveLeft() {
  if (spaceLeft()) {
    undraw();
    currentPosition -=1;
    draw();
  }
}
function moveRight() {
  if (spaceRight()) {
    undraw();
    currentPosition +=1;
    draw();
  }
}

// Function to rotate currentTetrimino
function rotate() {
  if(spaceLeft() && spaceRight()) {
    undraw();
    currentRotation = (currentRotation+1)%4;
    currentTet = typesArr[currType][currentRotation];
    if(currentTet.some(index => squaresArr[currentPosition + index].classList.contains('frozen'))) {
      currentRotation = (currentRotation-1)%4;
      currentTet = typesArr[currType][currentRotation];
      draw();
    }
    else {
      draw();
    }
  }
}

// Function to run movement functions (down/left/right/down - rotate block) dependent on key pressed
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

/* Function to remove all child nodes from a parent element
... used in completedLines function or if starting a new game*/
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
  }
}

// Function to remove completed lines
function completedLines() {
  //iterate through the array of squares, excluding the last 10 (base) squares
  for(let i=0; i<squaresArr.length-10; i+=gridWidth){
    let row = [];
    //create an array of each row
    for(let j=i; j<i+gridWidth; j++){
      row.push(j);
    }
    //i.e const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
    //Check if whole row is frozen, and remove frozen/tertrimino classes if so
    if(row.every(index=>squaresArr[index].classList.contains('frozen'))) {
      row.forEach(index=>squaresArr[index].classList.remove('frozen'));
      row.forEach(index=>squaresArr[index].classList.remove('tetrimino'));
      //cut out the row from squaresArr, starting from index i
      const squaresRemoved = squaresArr.splice(i,gridWidth);
      //combine the cut row with the remaining squaresArr
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
    speed -= 50;
    movementTimer = setInterval(moveDown, speed);
  }
}

// Function to announce score at end of game
function blink() {
  if (grid.innerHTML === "") {
    if(points>=highPoints) {
      grid.innerHTML = `<p id="gameOver">GAME OVER!<br><br>Congratulations, you have the highest score, ${points}!</p>`;
    }
    else {
      grid.innerHTML = `<p id="gameOver">GAME OVER!<br><br>You scored ${points}. Click 'New Game' to try again...</p>`;
    };
  }
  else {
    grid.innerHTML = "";
  };
}

// Funtion to test whether all squares are frozen/filled, ending the game
function gameOver() {
  if(currentTet.some(index=>squaresArr[index+currentPosition].classList.contains('frozen'))) {
    // clear move function to stop auto movement of tetrimino
    clearInterval(movementTimer);
    movementTimer = null;
    gameOn = false;
    blinkTimer = setInterval(blink, 500);
    // clear event listener for arrow keys being pressed
    document.removeEventListener('keydown', keysPressed);
    startBtn.innerHTML = "New Game";
  }
}

function pauseGame() {
  clearInterval(movementTimer);
  movementTimer = null;
  document.removeEventListener('keydown', keysPressed);
  tLeft.removeEventListener('click', moveLeft);
  tRight.removeEventListener('click', moveRight);
  tDown.removeEventListener('click', moveDown);
  tSpin.removeEventListener('click', rotate);
  startBtn.innerHTML = "Resume";
  gamePaused = true;
}


// ******** Event Listeners ******** 

window.addEventListener('load', () => {
  generateSquares(16, nextGrid, 'next-square');
  nextSquaresArr = Array.from(document.getElementsByClassName('next-square'));
});

// When the user clicks lego icon, open the Tetris modal
openTetris.addEventListener('click', () => {
  tModal.style.display = "block";
});

// When the user clicks on close (x), close the Tetris modal
closeTetris.addEventListener('click', () => {
  pauseGame();
  tModal.style.display = "none";
});

// When the user clicks anywhere outside of the Tetris modal, close it
window.addEventListener('click', (e) => {
  if (e.target == tModal) {
    pauseGame();
    tModal.style.display = "none";
  }
});

// Start/Pause button functionality
startBtn.addEventListener("click", () => {
  // If a game is in play and not currently paused, then pause it
  if (gameOn && !gamePaused) {
    pauseGame();
  }
  else {
    //if a game is paused, then unpause it
    if (gamePaused) {
      gamePaused = false;
    }
    //if there is no game on, then start one!
    else if (!gameOn) {
    points = 0;
    score.innerHTML = points;
    clearInterval(blinkTimer);
    undraw();
    undrawNext();
    removeAllChildNodes(grid);
    removeAllChildNodes(gridBase);
    generateSquares(200, grid, 'square');
    generateSquares(10, gridBase, 'square', 'frozen');
    squaresArr = Array.from(document.getElementsByClassName('square'));
    nextTetrimino();
    newTetrimino();
    speed = 1000;
    gameOn = true
    }

  // Whether starting a new game or unpausing one
  // Invoke move function every second to play
  movementTimer = setInterval(moveDown, speed);

  // Start event listener for arrow keys being pressed
  document.addEventListener('keydown', keysPressed);

  // Start event listeners for onscreen buttons being pressed
  tLeft.addEventListener('click', moveLeft);
  tRight.addEventListener('click', moveRight);
  tDown.addEventListener('click', moveDown);
  tSpin.addEventListener('click', rotate);

  startBtn.innerHTML = "Pause";
  }
})
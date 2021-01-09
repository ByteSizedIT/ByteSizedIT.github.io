// ******** MY ROBOT PROTOTYPE SECTION OF WEBSITE ********

// ******** Variables ******** 

// Initialise variables incl. request to watch and the Buzz icon/button
const request = document.getElementById('request');
const buzzIcon = document.getElementById('buzz-icon');
const buzzButts = document.querySelectorAll(".buzz-butts");
const buzz = document.querySelector("#buzz");

// Initialise variable for robot video
const robPlayer = document.querySelector("#robot__player");
const iframe = document.querySelector('iframe');

// Assign Vimeo Player method to a variable
const vimeoPlayer = new Vimeo.Player(iframe);

// Initialise variable for countdown
const countdown = document.querySelector('#countdown');

// Initialise variable for the last paragraph
const lastWord = document.querySelector('#lastWord');


// ******** Functions ******** 

function spinOut() {
  request.style.display = "block";
  request.classList.add('fade-in');
  buzzIcon.style.transform = 'rotate(3turn) scale(0,0)';
}

function showPlayer() {
  buzz.hidden = true;
  robPlayer.style.display = "block";
  robPlayer.classList.add('fade-in');
  finalWord.style.display = "none";
  countdown.style.display = "none";
}

function theEnd() {
    robPlayer.style.display = "none";
    finalWord.style.display = "block";
    countdown.style.display = "block";
    finalWord.classList.add('fade-in');
    countdown.classList.add('fade-in');
}

function calculateTimeframe() {
  // Initialise variable with current date and time
  const now = new Date().getTime();
  // Initialise variable with the date of next Founders and Coders course
  const courseDate = new Date("Mar 8, 2021 10:00:00").getTime();
  // Initialise variable with timeframe from now until count down date
  const timeframe = courseDate - now;
  //  Calculate days, hours, minutes and seconds
  let days = Math.floor(timeframe / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeframe % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeframe % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeframe % (1000 * 60)) / 1000);
  // If timeframe is positive number
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
}


// ******** Event Listeners ******** 

//Add Listeners to the play button and Buzz image to call function and show video
buzzButts.forEach(button => { 
  button.addEventListener('click', function() {
    spinOut();
    setTimeout(showPlayer, 1000);
  })
})

// Vimeo listener/function for hiding video and showing the last paragraph & countdown timer
vimeoPlayer.on('ended', theEnd); 

// Window set interval method to call a function that re-evaluates the countdown timer every second
const countDownTimer = setInterval(calculateTimeframe, 1000);

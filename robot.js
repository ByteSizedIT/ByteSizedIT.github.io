// ******** MY ROBOT PROTOTYPE SECTION OF WEBSITE ********


// Initialise variables incl. the Buzz icon/button
const request = document.getElementById('request');
const buzzIcon = document.getElementById('buzz-icon');
const buzzButts = document.querySelectorAll(".buzz-butts");
const buzz = document.querySelector("#buzz");

// Initialise variable for robot video
const robPlayer = document.querySelector("#robot__player");
const iframe = document.querySelector('iframe');

// Initialise variable with the date of next Founders and Coders course
const courseDate = new Date("Mar 8, 2021 10:00:00").getTime();

// Assign Vimeo Player method to a variable
const player = new Vimeo.Player(iframe);

// Declare countdown variables
const countdown = document.querySelector('#countdown');

let days;
let hours;
let minutes;
let seconds;

// Initialise variables for the last paragrahs
const lastWord = document.querySelector('#lastWord');


function spinIn() {
  request.style.display = "block";
  request.classList.add('fade-in');
  buzzIcon.style.transform = 'rotate(3turn) scale(0,0)';
}

function showtime() {
  buzz.hidden = true;
  robPlayer.style.display = "block";
  robPlayer.classList.add('fade-in');
  finalWord.style.display = "none";
  countdown.style.display = "none";
}

//Add Listeners to the play button and Buzz image to call function and show video
buzzButts.forEach(button => { 
  button.addEventListener('click', function() {
    console.log('spin in fired');
    spinIn();
    setTimeout(showtime, 1000);
  })
})

// listener/function for action on playing video - may be add a pop up promting to watch til the end!!!
/*player.on('play', function() {
  //
});
*/

// Vimeo listener/function for hiding video and showing the last paragraph & countdown timer
player.on('ended', function(data) { 
  console.log('done');
  robPlayer.style.display = "none";
  finalWord.style.display = "block";
  countdown.style.display = "block";
  finalWord.classList.add('fade-in');
  countdown.classList.add('fade-in');
}); 

// Window set interval method to call a function that re-evaluates the countdown timer every second
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
}, 1000);

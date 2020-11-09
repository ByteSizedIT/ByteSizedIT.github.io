// ******** MY ROBOT PROTOTYPE SECTION OF WEBSITE ********


// Initialise variable with the date of next Founders and Coders course
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
// ******** WHY ME? SECTION OF WEBSITE ********

// ******** Variables ******** 

// Initialise calculator modal elements as variables in JS
const cModal = document.getElementById("cModal");
const openCalc = document.getElementById("openCalc");
const closeCalc = document.getElementById("closeCalc");

// Initialise calculator elements as variables in JS
let calculation = document.getElementById("calculation__value");
let output = document.getElementById("output__value");

// Declare variables to hold values/data when calculating input to calculation and output elements
let calcData;
let outputData

// Initialise variable to indicate whether equals was last button pressed
let sumDone = false;

// Initialise an array of number buttons
const numbers = document.getElementsByClassName("number");

//Initialise an array of operator buttons
const operators = document.getElementsByClassName("operator");


// ******** Functions ******** 

// Function to transform num into comma seperated number, for displaying (in setOutput())
function formatNum(num) {
  const f = Number(num);
  return f.toLocaleString("en");
}

// Function to transform comma seperated number in to non-comma seperated, for clearing last entry (operators())
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

// Function to update output data before setting output field
function updateOutputData() {
  outputData = unformatNum(getOutput());
  // Lines to remove initial emoji etc
  if(isNaN(outputData)) {
    setOutput(this.id);
    setCalculation("");
  }
  //Clear rather than append if last button was =
  else if (sumDone == true) {
     outputData = this.id;
     setOutput(outputData);
     sumDone = false;
  }
  //Append
  else {
  outputData = outputData + this.id;
  setOutput(outputData);
  }
}

// Function to identify and action operators
function actionOperators() {
  if (this.id == "clear") {
    setCalculation("");
    setOutput("");
  }
  else if (this.id == "CE") {
    outputData = unformatNum(getOutput()).toString(); //remove commas and convert back to string
    outputData = outputData.substring(0, outputData.length-1);
    if(isNaN(outputData)) { // lines to remove initial emoji value etc
      outputData = 0;
      setCalculation("");
    }
    setOutput(outputData);
  }
  else {
    outputData = unformatNum(getOutput())
    if(isNaN(outputData)) { // lines to remove initial emoji value etc
      setCalculation("0"+this.id);
      output.innerText = "";
    }
    else {
      if (this.id == "=") {
        calcData = getCalculation() + outputData;
        let result = eval(calcData);
        setOutput(result);
        setCalculation("");
        sumDone = true;
      }
      else {
        calcData = getCalculation() + outputData + this.id;
        setCalculation(calcData);
        output.innerText = "";
      }
    }
  }
}


// ******** Event Listeners ******** 

// Create listeners to append a number to output value when a number button is pressed
for(let i=0; i<numbers.length; i++) {
  numbers[i].addEventListener('click', updateOutputData)
};

// When the user clicks 'here' text, open the calculator modal
openCalc.addEventListener('click', () => {
  cModal.style.display = "block";
});
// When the user clicks on close (x), close the calculator modal
closeCalc.addEventListener('click', () => {
  cModal.style.display = "none";
});
// When the user clicks anywhere outside of the calculator modal, close it
window.addEventListener('click', (e) => {
  if (e.target == cModal) {
    cModal.style.display = "none";
  }
});

// Create listeners to respond to operators being pressed
for(let i=0; i<operators.length; i++) {
  operators[i].addEventListener('click', actionOperators)
};
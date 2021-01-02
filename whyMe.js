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
      setOutput(this.id);
      setCalculation("");
    }
    else if (sumDone == true) {
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
      outputData = unformatNum(getOutput()).toString(); //remove commas and convert back to string
      outputData = outputData.substring(0, outputData.length-1); //remove last digit
      if(isNaN(outputData)) { // lines to remove initial emoji value etc
        outputData = 0;
        setCalculation("");
      }
      setOutput(outputData);
    }

    else {
      outputData = unformatNum(getOutput())
      console.log(`output1: ${outputData}`)
      //outputData = getOutput();
      console.log(`output2: ${outputData}`)
      //calcData = getCalculation();
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
          console.log(`calcData1: ${calcData}`)
          calcData = getCalculation() + outputData + this.id;
          console.log(`calcData2: ${calcData}`)
          setCalculation(calcData);
          output.innerText = "";
        }
      }
    }
  })
}
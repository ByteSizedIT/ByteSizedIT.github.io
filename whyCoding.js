// ******** WHY CODING? SECTION OF WEBSITE ********

// ******** Variables ******** 

//Initialise Google 'search box' and empty' (X) buttton in JS
const googleSearchText = document.getElementById('googleSearchTxt');
const emptyGoogleBtn = document.getElementById('emptyGoogleBtn');


// ******** Functions ******** 

//Function to make the 'empty' button (X) appear/disappear in Google Search text box (when text is entered/removed)
function toggleEmptyGoogleBtn() {
    if(googleSearchText.value === "") {
        emptyGoogleBtn.style.visibility = "hidden";
        action.style.action = "";
    }
    else {
        emptyGoogleBtn.style.visibility = "visible";
    }
}

//Function to clear the Google Search Text when the 'empty' button (X) is clicked
function clearGoogle() {
    emptyGoogleBtn.style.visibility = "hidden";
    googleSearchText.value = "";
}


// ******** Event Listeners ******** 

googleSearchText.addEventListener("keyup", toggleEmptyGoogleBtn);

emptyGoogleBtn.addEventListener("click", clearGoogle);

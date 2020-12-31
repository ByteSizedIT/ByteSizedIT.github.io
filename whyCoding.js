// ******** WHY CODING? SECTION OF WEBSITE ********


//Initialise 'search box' and Google 'empty' (X) buttton as objects in JS
const googleSearchText = document.getElementById('googleSearchTxt');
const emptyGoogle = document.getElementById('emptyGoogleSearch');

//Make the 'empty' button (X) appear in Google Search text box (when text is entered)
function toggleEmpty() {
    if(googleSearchText.value === "") {
        emptyGoogle.style.visibility = "hidden";
        action.style.action = "";
    }
    else {
        emptyGoogle.style.visibility = "visible";
    }
}

googleSearchText.addEventListener("keyup", toggleEmpty);

//Make the text in the Google Search page's text box disappear when the 'empty' button (X) is pressed
emptyGoogle.addEventListener("click", () => {
    emptyGoogle.style.visibility = "hidden";
    googleSearchText.value = "";
});
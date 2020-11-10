// ******** WHY CODING? SECTION OF WEBSITE ********


//Initialise 'search box' and Google 'empty' (X) buttton as objects in JS
const searchBox = document.getElementById('text');
const empty = document.getElementById('empty');

//Make the 'empty' button (X) appear in Google Search text box (when text is entered)
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
empty.addEventListener("click", () => {
    empty.style.visibility = "hidden";
    searchBox.value = "";
});



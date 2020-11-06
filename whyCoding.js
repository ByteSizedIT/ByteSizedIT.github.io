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



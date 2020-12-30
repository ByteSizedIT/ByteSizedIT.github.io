// ******** WHY FAC? SECTION OF WEBSITE ********


// Initialise js variables for search box and suggestion elements
const glossSearchText = document.querySelector('#glossSearchText');
const emptyGloss = document.querySelector('#emptyGlossSearch');

const suggestions = document.querySelector('#glossSuggestions');                                     

// Initialise variable for endpoint location of reference json file stored as a gist
const endpoint = 'https://gist.githubusercontent.com/ByteSizedIT/1c8561bb56e71e56a93d77a9a40741d9/raw/264477a4f1c159bbc0bc01db39b376db2a16168a/FACglossary.json';

// Initialise variable/array for storing entries returned frin reference gist file
const entries = [];


// Use fetch API method, passing in the endpoint of the json reference file
fetch(endpoint)
  //convert/identify raw data returned in to a json format to make it readable
  .then(response => response.json())
  //spread each individual item from the json file on to the end of the entries array
  .then(data => entries.push(...data));


// Create a function to filter entries returned by fetch API
function findMatches(text, entries) {
  const reg = new RegExp(text, 'gi');
  return entries.filter(entry => entry.term.match(reg) || entry.definition.match(reg))
}

// Create a function to display found matches
function displayMatches() {
  const matches = findMatches(this.value, entries);
  const searchReg = new RegExp(this.value, 'gi');
  const html = matches.map(entry => {
    const matchedTerm = entry.term.toUpperCase().replace(searchReg, `<span class='highlight1'>${this.value.toUpperCase()}</span>`);
    const matchedDef = entry.definition.replace(searchReg, `<span class='highlight2'>${this.value}</span>`);
    const matchedLinks = entry.link.split(" ").map(link => {return `</br><a href="${link}" target="_blank">${link}</a>`}).join("");
    return `
    <li>
      <!--<span><b>${entry.term}:</b> ${entry.definition}</span>-->
      <span><b>${matchedTerm}:</b> ${matchedDef}</span></br>
      <span><b>links:</b> ${matchedLinks}</span>
    </li>
    `;
  }).join("");
  suggestions.innerHTML = html;
}
  
//Make the 'empty' button (X) appear in Search's text box (when text is entered)
function toggleEmptyGloss() {
  console.log(this.value);
  if(this.value == "") {
    emptyGloss.style.visibility = "hidden";
    suggestions.innerHTML = "";
  }
  else {
    emptyGloss.style.visibility = "visible";
  }
}

// Listener when typing new search term, to (find &) display matches
glossSearchText.addEventListener('keyup', displayMatches);

// Listener when typing/deleting search term, to show 'X'(empty) button or hide 'X' button and remove suggestions
glossSearchText.addEventListener("keyup", toggleEmptyGloss);

emptyGloss.addEventListener("click", () => {
  emptyGloss.style.visibility = "hidden";
  glossSearchText.value = "";
  suggestions.innerHTML = "";
});
// ******** WHY FAC? SECTION OF WEBSITE ********


// Initialise js variables for search and suggestion elements
const searchBox2 = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

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
function findMatches(searchText, entries) {
  return entries.filter(entry => {
      const searchReg = new RegExp(searchText, 'gi');
      return entry.term.match(searchReg) || entry.definition.match(searchReg);
  })
}

// Create a function to display found matches
function displayMatches(e) {
  //console.log(e);
  //console.log(this);
  //console.dir(this);
  const matches = findMatches(this.value, entries);
  const searchReg = new RegExp(this.value, 'gi');
  const html = matches.map(entry => {
      const matchedTerm = entry.term.replace(searchReg, `<span class='highlight'>${this.value}</span>`);
      const matchedDef = entry.definition.replace(searchReg, `<span class='highlight'>${this.value}</span>`);
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
  
  searchBox2.addEventListener('keyup', displayMatches);
// ******** BYTESIZEDIT SECTION OF WEBSITE ********

// ******** Variables ******** 

const reviews = document.getElementsByClassName("review");


// ******** Functions ******** 

function openReview() {
  this.classList.toggle("active");
  const content = this.nextElementSibling;
  if (content.style.maxHeight){
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  };
}


// ******** Event Listeners ******** 

for (let i = 0; i < reviews.length; i++) {
  reviews[i].addEventListener("click", openReview)};
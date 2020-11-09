// ******** BYTESIZEDIT SECTION OF WEBSITE ********


const reviews = document.getElementsByClassName("review");

for (let i = 0; i < reviews.length; i++) {
  reviews[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    };
  });
}
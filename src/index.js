function citySearch(event) {
  event.preventDefault();
  let searchbox = document.querySelector("#search-input");
  /*console.log(searchbox.value);*/
  let cityprint = document.querySelector("#city");
  cityprint.innerHTML = searchbox.value;
}

let searchform = document.querySelector("#search-forms");
searchform.addEventListener("click", citySearch);

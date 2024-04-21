function updateWeather(response) {
  console.log(response.data.temperature.current);
  let temperature = document.querySelector("#temp-figure");
  let temperaturefigure = Math.round(response.data.temperature.current);
  temperature.innerHTML = temperaturefigure;

  let cityprint = document.querySelector("#city");
  cityprint.innerHTML = response.data.city;
}

function searchCityweather(city) {
  let api_key = "ee88953fd2a466oa4c850t79d8cb473f";
  let api_url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${api_key}`;
  console.log(api_url);
  axios.get(api_url).then(updateWeather);
}

function citySearch(event) {
  event.preventDefault();
  let searchbox = document.querySelector("#search-input");
  /*console.log(searchbox.value);*/

  searchCityweather(searchbox.value);
}

let searchform = document.querySelector("#search-forms");
searchform.addEventListener("click", citySearch);

searchCityweather("New york");

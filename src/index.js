function updateWeather(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  let temperature = document.querySelector("#temp-figure");
  let temperaturefigure = Math.round(response.data.temperature.current);
  temperature.innerHTML = temperaturefigure;
  let cityprint = document.querySelector("#city");
  cityprint.innerHTML = response.data.city;
  let weatherEmoji = document.querySelector("#description");
  weatherEmoji.innerHTML = response.data.condition.description;
  let humidityvalue = document.querySelector("#humidity");
  humidityvalue.innerHTML = response.data.temperature.humidity;
  let windvalue = document.querySelector("#wind");
  windvalue.innerHTML = response.data.wind.speed;
  let dateValue = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  dateValue.innerHTML = formatDate(date);
  let emojiIcon = document.querySelector("#temp-emoji");
  emojiIcon.innerHTML = `<img src="${response.data.condition.icon_url}"
                class="temp-emoji"/>`;
  getForecast(response.data.city);

  //console.log(response.data.time);
  //first option: won't use because of how date is formatted
  //dateValue.innerHTML = `${date.getDay()}: ${date.getHours()}:${date.getMinutes()}`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (x = `${day}: ${hour}: ${minutes}`);
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

searchCityweather("Paris");

function searchForecast(response) {
  let forecastlist = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 7) {
      forecastlist += `<div class=x > <div class="forecast-day">${forecastDate(
        day.time
      )}</div> <img
              src="${day.condition.icon_url}"
              alt="" class="forecast-icon"
            /> <div class="forecast-temp">
            <span class="min"> ${Math.round(
              day.temperature.minimum
            )}°C</span>| <span class="max">${Math.round(
        day.temperature.maximum
      )}°C </span>
          </div> </div>`;
    }
  });
  let forecastData = document.querySelector("#forecast-details");
  forecastData.innerHTML = forecastlist;
}

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  api_key = "ee88953fd2a466oa4c850t79d8cb473f";
  forecast_url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${api_key}&unit=metric`;
  console.log(forecast_url);
  axios.get(forecast_url).then(searchForecast);
}

searchForecast();

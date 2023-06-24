function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0${hours}";
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0${mintues}";
  }
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayCast(response) {
  let cast = response.data.daily;

  let castElement = document.querySelector("#cast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let castHTML = '<div class="row">';
  cast.forEach(function (castDay, index) {
    if (index < 6) {
      castHTML =
        castHTML +
        `
<div class="col-2">
    <div class="forcast-date">${formatDay(castDay.time)}</div>
        ${index}
    <img 
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png";
     alt="" 
     width="42" 
     />
    <div class="forcast-temperature">
      <span class="forcast-temperature-maxi"> ${Math.round(
        castDay.temperature.maximum
      )}° </span>
      <span class="forcast-temperature-mini">${Math.round(
        castDay.temperature.minimum
      )}° </span>
    </div>
  </div>
`;
    }
  });
  castHTML = castHTML + "</div>";
  castElement.innerHTML = castHTML;
}
function getCast(coordinates) {
  let apiKey = "e7846e44c0bd21b19tc86a51o0fef236";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/forecast?lat=38.71667&lon=-9.13333&key=e7846e44c0bd21b19tc86a51o0fef236&units=metric";
  axios.get(apiUrl).then(displayCast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let moistElement = document.querySelector("#moist");
  let airElement = document.querySelector("#air");
  let gdateElement = document.querySelector("#gdate");
  let iconElement = document.querySelector("#icon");

  // displayCast();
  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  moistElement.innerHTML = response.data.temperature.humidity;
  airElement.innerHTML = Math.round(response.data.wind.speed);
  gdateElement.innerHTML = formateDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getCast(response.data.coord);
}
function search(city) {
  let apiKey = "e7846e44c0bd21b19tc86a51o0fef236";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e7846e44c0bd21b19tc86a51o0fef236&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("lisbon");

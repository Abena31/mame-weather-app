function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = timestamp.getHours();
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
    " Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return "${day} ${hours}:${minutes}";
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[day];

}

function displayCast(response) {
 let cast = response.data.daily;

 let castElement = document.querySelector("#cast");

let days=["Thu","Fri","Sat","Sun"];

 let castHTML = '<div class="row">';
 days.forEach(function(castDay){
})
 castHTML=
  castHTML+
 '
<div class="col-2">
    <div class="forcast-date">${formatDay
        (castDay.dt)}</div>
    <img 
    src="http://openweathermap.org/img/wn/${castDay.weather.[0].icon}@2x.png"
     alt="" 
     width="43" 
     />
    <div class="forcast-temperature">
      <span class="forcast-temperature-maxi"> ${castDay.temp.max}° </span>
      <span class="forcast-temperature-mini">${castDay.temp.min}° </span>
    </div>
  </div>
';

castHTML= castHTML+'</div>';
castElement.innerHTML=castHTML;
 
}
function getCast(coordinates) {
let apiKey = "79e8e44340f805883833d9a47487d24b";
let apiUrl ='https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric';
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

  displayCast();

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  moistElement.innerHTML = response.data.main.moist;
  airElement.innerHTML = Math.round(response.data.air.speed);
  gdateElement.innerHTML = formateDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
   
  getCast(response.data.coord);
}
function search(city) {
  let apiKey = "79e8e44340f805883833d9a47487d24b";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?g=${city}&appid=${apiKey}&units=metric";
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
  temperatureElement, (innerHTML = Math.round(celsiusTemperature));
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

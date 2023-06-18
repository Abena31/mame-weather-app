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

function displayCast() {
 let castElement = document.querySelector("#cast");

 let castHTML = '<div class="row">';
 let days=["Thu","Fri","Sat","Sun"];
 days.forEach(function(day){
})
 castHTML= castHTML+
 '
<div class="col-2">
    <div class="forcast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/50d@2x.png"
     alt="" 
     width="43" 
     />
    <div class="forcast-temperature">
      <span class="forcast-temperature-maxi"> 18° </span>
      <span class="forcast-temperature-mini">12° </span>
    </div>
  </div>
';
 castHTML= castHTML+'</div>';
castElement.innerHTML=castHTML;
 
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

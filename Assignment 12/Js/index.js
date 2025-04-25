const weatherCards = document.querySelector(".card_group");
const searchInput = document.querySelector("input[type='search']");
const searchForm = document.querySelector("form");
const API_KEY = "9a465035af334f8d92683832252404";

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Cairo");
});

function fetchWeather(city) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      if (data.forecast && data.forecast.forecastday) {
        displayWeather(data.current, data.forecast.forecastday, data.location.name);
      } else {
        showError("Invalid data received from API");
      }
    })
    .catch(error => {
      showError(error.message);
    });
}

function displayWeather(current, days, city) {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = today.toLocaleDateString("en-US", { day: "numeric", month: "long" });
  
  weatherCards.innerHTML = `
    <div class="card col today">
      <div class="card-header d-flex justify-content-between rounded-end-0">
        <h3>${dayName}</h3>
        <h3>${formattedDate}</h3>
      </div>
      <div class="card-body">
        <h5 class="card-title">${city}</h5>
        <div class="degrees d-flex">
          <p class="card-text">${current.temp_c}<sup>o</sup>C</p>
          <img src="https:${current.condition.icon}" alt="${current.condition.text}" style="width:90px; height:90px; align-self: center; margin-left: 0px; margin-right: 20px;">
        </div>
        <span>${current.condition.text}</span>
        <div class="card_F d-flex">
          <div class="first">
            <img src="imgs/icon-umberella.png" alt="humidity">${current.humidity}%
          </div>
          <div class="first">
            <img src="imgs/icon-wind.png" alt="wind">${current.wind_kph}km/h
          </div>
          <div class="first">
            <img src="imgs/icon-compass.png" alt="compass">${current.wind_dir}
          </div>
        </div>
      </div>
    </div>
    ${
      days.slice(1).map((day, index) => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const roundedClass = index === days.length - 2 ? "rounded-start-0" : "rounded-0";
        const dayType = index === 0 ? "tomorrow middle" : "overmorrow";
        
        return `
          <div class="card col ${dayType}">
            <div class="card-header text-center ${roundedClass}">
              <h3>${dayName}</h3>
            </div>
            <div class="second card-body d-flex flex-column text-center">
              <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" style="width:45px; height:45px; margin-bottom:20px; align-self: center;">
              <h3 class="card-text">${day.day.maxtemp_c}<sup>o</sup>C</h3>
              <p>${day.day.mintemp_c} <sup>o</sup></p>
              <span>${day.day.condition.text}</span>
            </div>
          </div>
        `;
      }).join('')
    }
  `;
}

function showError(message) {
  weatherCards.innerHTML = `
    <div class="col-12 text-center text-danger">
      <p>${message}</p>
      <button onclick="fetchWeather('Cairo')">Reload Default</button>
    </div>
  `;
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});
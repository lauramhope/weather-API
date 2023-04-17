import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

// this is the code that handles creating our API call - making a request, sending it, and handling the response
function getWeather(city) {
  let request = new XMLHttpRequest(); 
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  // const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${process.env.API_KEY_2}`;

  request.addEventListener("loadend", function() { 
    const response = JSON.parse(this.responseText); 
    // console.log(response);
    if (this.status === 200) {
      printElements(response, city); 
    } else {
      printError(this, response, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getWeatherByZip(zipCode) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${zipCode},us&appid=${process.env.API_KEY_2}`;

  request.addEventListener("loadend", function() { 
    const response = JSON.parse(this.responseText); 
    if (this.status === 200) {
      printElements(response, zipCode); 
    } else {
      printError(this, response, zipCode);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getWeatherBy5Day(lat, lon) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY_3}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, lat, lon);
    } else {
      printError(this, response, lat, lon); 
    }
  });

  request.open("GET", url, true);
  // request.send();
}

// UI Logic

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Farenheit is ${Number(((apiResponse.main.temp - 273.15)* 9/5 + 32).toFixed(1))} degrees. The wind speed is ${apiResponse.wind.speed} mph. Currently: ${apiResponse.weather[0].description}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  const zipCode = document.querySelector('#location').value; 
  const {Latitude: lat, Longitude: lon} = document.querySelector('#location').value; 
  document.querySelector('#location').value = null;
  getWeather(city);
  getWeatherByZip(zipCode); 
  getWeatherBy5Day(lat, lon); 
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
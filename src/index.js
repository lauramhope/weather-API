import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather.service';

// Business Logic

function getWeather(city) {
  let promise = WeatherService.getWeather(city);
  promise.then(function(weatherDataArray) {
    printElements(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getWeatherByZip(zipCode) {
  let promise = WeatherService.getWeatherByZip(zipCode);
  promise.then(function(weatherDataArray) {
    printElements(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// function getWeatherBy5Day(lat, lon) {
//   let request = new XMLHttpRequest();
//   const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;

//   request.addEventListener("loadend", function() {
//     const response = JSON.parse(this.responseText);
//     if (this.status === 200) {
//       printElements(response, lat, lon);
//     } else {
//       printError(this, response, lat, lon); 
//     }
//   });

//   request.open("GET", url, true);
//   request.send();
// }

// UI Logic

function printElements(data) {
  document.querySelector('#showResponse').innerText = `The humidity in ${data[1]} is ${data[0].main.humidity}%.
  The temperature in Farenheit is ${Number(((data[0].main.temp - 273.15)* 9/5 +32).toFixed(1))} degrees.`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  const zipCode = document.querySelector('#location').value; 
  // const latLonObj = document.querySelector('#location').value; 
  // const latLonArray = latLonObj.split(",");
  // const lat = parseFloat(latLonArray[0]);
  // const lon = parseFloat(latLonArray[1]);
  document.querySelector('#location').value = null;
  getWeather(city);
  getWeatherByZip(zipCode); 
  // getWeatherBy5Day(lat, lon); 
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
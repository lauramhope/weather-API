import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

// this is the code that handles creating our API call - making a request, sending it, and handling the response
function getWeather(city) {
  let request = new XMLHttpRequest(); // use the constructor of the XMLHttpRequest object (XHR) to create a new instance of it - save this instance in a variable called "request"
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;  // same the URL for our API call in a variable called "url" -- template literal with an embedded expression ${city} so the value the user inputs into the form is passed directly into our URL string via our city variable

  request.addEventListener("loadend", function() { // listens for when our API call is complete, set up an event listener for the XMLHttpRequest object's event called "loadend" - will fire when a request (API call) has been completed, whether it was successful or not
    const response = JSON.parse(this.responseText); // when the API call is finished, the callback function will run - does 3 things 1. parses the API response, 2. checks to see if it was 200 (successful). JSON parse() method is essential for working with APIs
    console.log(response);
    if (this.status === 200) {
      printElements(response, city); // if successful, will print the data we received from the API
    } else {
      // there's a new argument
      printError(this, response, city);
    }
  });

  request.open("GET", url, true); // these lines of code open and send the request ... XMLHttpRequest.open() method takes 3 arguments - 1. the method of the request ("GET"), 2. the request URL (stored in a variable url), 3. a boolean for whether the request should be asynchronous or not -- we ALWAYS want it to be async, so the things in the parameters should always be the same
  request.send();
}

function getWeather2(zipCode) {
  let request = new XMLHttpRequest(); // use the constructor of the XMLHttpRequest object (XHR) to create a new instance of it - save this instance in a variable called "request"
  const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${zip code}&appid=${process.env.API_KEY}`  // same the URL for our API call in a variable called "url" -- template literal with an embedded expression ${city} so the value the user inputs into the form is passed directly into our URL string via our city variable

  request.addEventListener("loadend", function() { // listens for when our API call is complete, set up an event listener for the XMLHttpRequest object's event called "loadend" - will fire when a request (API call) has been completed, whether it was successful or not
    const response = JSON.parse(this.responseText); // when the API call is finished, the callback function will run - does 3 things 1. parses the API response, 2. checks to see if it was 200 (successful). JSON parse() method is essential for working with APIs
    console.log(response);
    if (this.status === 200) {
      printElements(response, zipCode); // if successful, will print the data we received from the API
    } else {
      // there's a new argument
      printError(this, response, zipCode);
    }
  });

  request.open("GET", url2, true); // these lines of code open and send the request ... XMLHttpRequest.open() method takes 3 arguments - 1. the method of the request ("GET"), 2. the request URL (stored in a variable url), 3. a boolean for whether the request should be asynchronous or not -- we ALWAYS want it to be async, so the things in the parameters should always be the same
  request.send();
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
  const city = document.querySelector('#location').value; // get value from form input and save it in a variable "city"
  document.querySelector('#location').value = null;
  getWeather(city); // call the getWeather function with the city as an argument - getWeather handles making our API call to get the current weather data for the user-inputted city
  getWeather2(zipCode); 
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
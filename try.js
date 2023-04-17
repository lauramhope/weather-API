// Business Logic
function checkNumber(number) {
  if (isNaN(number) || number < 0) {
    return new Error("Not a valid number!");
  } else {
    return true;
  }
}

// User Interface Logic
window.addEventListener("load", function() {
  document.querySelector('#submittedNumber').addEventListener("submit", function(event) {
    event.preventDefault();

    const inputtedNumber = parseInt(document.querySelector('#number').value);
    document.querySelector('#number').value = null;

    try {
      const isNumberValid = checkNumber(inputtedNumber);
      if (isNumberValid instanceof Error) {
        console.error(isNumberValid.message);
        throw RangeError("Not a valid number!");
      } else {
        console.log("Try was successful, so no need to catch!");
        document.querySelector('#displayNumber').innerText = "This number is valid. You may continue.";
      }
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }
  });
});
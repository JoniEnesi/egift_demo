document.getElementById("year").textContent = new Date().getFullYear()


// Get the price element by its id
  var priceElement = document.getElementById("default_price");
  var priceElement1 = document.getElementById("custom_price");

  // Get all the amount buttons by their class name
  var amountButtons = document.getElementsByClassName("amount-button");

  // Get the input element by its class name
  var amountInput = document.querySelector(".form-control");

  // Loop through the buttons and add a click event listener to each
  for (var i = 0; i < amountButtons.length; i++) {
    amountButtons[i].addEventListener("click", function() {
      // Get the value of the clicked button
      var amount = this.value;

      // Update the content of the price element
      priceElement.textContent = amount;
      priceElement1.textContent = amount;
    });
  }

  // Add an input event listener to the input element
  amountInput.addEventListener("input", function() {
    // Get the value from the input element
    var customAmount = this.value;
    // Check if the custom amount is a valid number
    if (!isNaN(customAmount)) {
      priceElement.textContent = customAmount + "$";
      priceElement1.textContent = customAmount + "$";
    } else {
      priceElement.textContent = "Amount";
      priceElement1.textContent = "Amount";
    }
  });

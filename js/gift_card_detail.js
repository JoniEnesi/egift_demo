const validation = (event) =>{
    event.preventDefault();
}

//---------------------------------------------------------------------------

// Get all the images within the image_design class
const designImages = document.querySelectorAll('.image_design img');

// Get the image element
const bannerImage = document.getElementById('bannerimage');

// Store the initial image source
const initialImageUrl = bannerImage.src;

// Create an object to store the click counts for each image
const clickCounts = {};

// Add a CSS class to the banner image
bannerImage.classList.add('card-image');

// Create a function to change the image source and update product_img
function changeImage(event) {
  const image = event.target;

  // Check if the image is in the clickCounts object, initialize it if not
  if (!clickCounts[image]) {
    clickCounts[image] = 0;
  }

  // Increment the click count
  clickCounts[image]++;

  // Get the src attribute of the clicked image
  const imageUrl = image.src;

  // Check if the image has been clicked an odd number of times
  if (clickCounts[image] % 0 !== 0) {
    // Set the src attribute of the banner image to the clicked image's src
    bannerImage.src = imageUrl;
    // Update the product_img value
    product_img = imageUrl;
    // Add the active class to highlight the image (you can add your styling logic here)
    image.classList.add('active');
  } else {
    // Remove the active class to unhighlight the image
    image.classList.remove('active');
  }
}

// Attach a click event listener to each image
designImages.forEach((image) => {
  image.addEventListener('click', changeImage);
});




//-----------------------------------------------------------------------------------------

// to know the value for payment
function selectAmount(amount) {
    document.getElementById('selected-amount').value = amount;
}

function updateSelectedAmount(amount) {
    document.getElementById('selected-amount').value = amount;
}



// to know image for payment
const image = document.getElementById('bannerimage');
const hiddenInput = document.getElementById('selected-image');

let initialSrc = image.getAttribute('src');

const checkSrcChange = () => {
    const currentSrc = image.getAttribute('src');

    if (currentSrc !== initialSrc) {
        hiddenInput.value = currentSrc;

        initialSrc = currentSrc;
    }
};

const observer = new MutationObserver(checkSrcChange);

const config = { attributes: true, attributeFilter: ['src'] };

observer.observe(image, config);



//-----------------------------------------------------------------------------------------

    // Get current date and time in the format required by datetime-local input
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // Set the min attribute of the datetime-local input to the current date and time
    document.getElementById('product_datatime').min = getCurrentDateTime();

    // Function to check if the selected time has passed
    function checkDateTime() {
        // Get the selected datetime
        const selectedDateTime = new Date(document.getElementById('product_datatime').value);
        // Get the current datetime
        const currentDateTime = new Date();
        // Compare the selected datetime with the current datetime
        if (selectedDateTime < currentDateTime) {
            // Show error message
            document.getElementById('errorMessage').innerText =
                Swal.fire({
                  title: "You cannot select a past time!",
                  text: "Please choose a future time.",
                  icon: "info",
                });
            document.getElementById('errorMessage').style.display = 'block';
            // Clear the input field after 4 seconds
            setTimeout(function(){
                document.getElementById('product_datatime').value = '';
                document.getElementById('errorMessage').style.display = 'none';
            }, 3000);
        }
    }

    // Add onchange event listener to the datetime-local input
    document.getElementById('product_datatime').onchange = checkDateTime;
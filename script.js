// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"), // Select the wrapper element
  carousel = document.querySelector(".carousel"), // Select the carousel element
  images = document.querySelectorAll("img"), // Select all the image elements
  buttons = document.querySelectorAll(".button"); // Select all elements with the class "button"

let imageIndex = 1, // Initialize the current image index to 1
  intervalId;

// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};

// Call autoSlide function on page load to initiate automatic sliding
autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index, ensuring it loops around when reaching the end or beginning
  imageIndex =
    imageIndex === images.length
      ? 0
      : imageIndex < 0
      ? images.length - 1
      : imageIndex;

  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow when a button is clicked
  clearInterval(intervalId);

  // Calculate the updated image index based on the button clicked (next or previous)
  imageIndex += e.target.id === "next" ? 1 : -1;

  // Call slideImage to display the updated image
  slideImage(imageIndex);

  // Restart the automatic slideshow after a button click
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding when the mouse is over the carousel
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));

// Add mouseleave event listener to wrapper element to start auto sliding again when the mouse leaves the carousel
wrapper.addEventListener("mouseleave", autoSlide);

// JavaScript for popup functionality
const enquiryBtn = document.getElementById("enquiry-btn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");

enquiryBtn.addEventListener("click", () => {
  popup.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
  }
});

// timer
// Set the target date and time
const targetDate = new Date("February 02, 2025 23:59:59").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  // Calculate time components
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Update the DOM
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  // If the countdown is over, show "Expired"
  if (difference < 0) {
    document.getElementById("days").textContent = "-";
    document.getElementById("hours").textContent = "-";
    document.getElementById("minutes").textContent = "-";
    document.getElementById("seconds").textContent = "-";
    clearInterval(interval);
  }
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
//

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add scroll event listener
window.addEventListener("scroll", function () {
  const countdownContainer = document.querySelector(".countdown-container");

  if (isInViewport(countdownContainer)) {
    countdownContainer.classList.add("scroll-visible");
  }
});

// Function to check if the image is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to apply animation to images
function applyScrollAnimation() {
  const images = document.querySelectorAll(".card__img");
  images.forEach((img) => {
    if (isInViewport(img) && !img.classList.contains("animate")) {
      img.classList.add("animate");
    }
  });
}

// Run the animation function both on scroll and on page load
window.addEventListener("scroll", applyScrollAnimation);
window.addEventListener("DOMContentLoaded", applyScrollAnimation); // Trigger on initial load

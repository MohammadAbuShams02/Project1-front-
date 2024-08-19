const form = document.querySelector(".login-form form");
const errorDiv = document.getElementById("error-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.toLowerCase();
  const password = document.getElementById("password").value;

  if (username === "pizza" && password === "123") {
    window.location.href = "./home.html";
  } else {
    errorDiv.textContent = "Invalid inputs!";
    errorDiv.style.display = "block";
  }
});

const toggleButton = document.getElementById("toggleDarkMode");

toggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Switch to Light Mode";
  } else {
    toggleButton.textContent = "Switch to Dark Mode";
  }
});

document.getElementById("menu-toggle").addEventListener("click", function() {
  document.querySelector("nav").classList.toggle("active");
});
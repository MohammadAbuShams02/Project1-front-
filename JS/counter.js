document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("active");
});

document
  .getElementById("increase-counter-btn")
  .addEventListener("click", function () {
    const counterDisplay = document.getElementById("counter-display");
    let currentCount = parseInt(counterDisplay.textContent);
    counterDisplay.textContent = currentCount + 1;
  });

document
  .getElementById("decrease-counter-btn")
  .addEventListener("click", function () {
    const counterDisplay = document.getElementById("counter-display");
    let currentCount = parseInt(counterDisplay.textContent);
    if (currentCount > 0) {
      counterDisplay.textContent = currentCount - 1;
    }
  });

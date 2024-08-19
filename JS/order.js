document
  .getElementById("order-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pizza = document.getElementById("pizza").value;
    const quantity = document.getElementById("quantity").value;

    document.getElementById("order-form").classList.add("hidden");

    document.querySelector("#order-section h2").classList.add("hidden");

    const confirmationDiv = document.getElementById("order-confirmation");
    confirmationDiv.classList.remove("hidden");
    confirmationDiv.innerHTML = `
        <h3>Thank you, ${name}!</h3>
        <p>Your order for ${quantity} ${pizza}(s) has been placed.</p>
        <p>A confirmation email has been sent to ${email}.</p>
    `;
  });

  document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector("nav").classList.toggle("active");
});
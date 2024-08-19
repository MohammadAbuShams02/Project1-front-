document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector("nav").classList.toggle("active");
});

document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    document.querySelector('#reservation-section h2').classList.add('hidden');

    document.getElementById('reservation-form').classList.add('hidden');

    const confirmationSection = document.getElementById('confirmation');
    confirmationSection.classList.remove('hidden');
    confirmationSection.innerHTML = `
        <h3>Thank you for your reservation, ${name}!</h3>
        <p>We have reserved a table for ${guests} guests on ${date} at ${time}.</p>
        <p>A confirmation email has been sent to ${email}.</p>
    `;
});

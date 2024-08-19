document.getElementById('opinion-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const name = document.getElementById('name').value;
  const opinionText = document.getElementById('opinion').value;

  const opinionElement = document.createElement('div');
  opinionElement.className = 'opinion';
  opinionElement.innerHTML = `<strong>${name}</strong> says: <p>${opinionText}</p>`;

  const opinionsDisplay = document.getElementById('opinions-display');
  opinionsDisplay.append(opinionElement);

  document.getElementById('opinion-form').reset();
});

document.getElementById("menu-toggle").addEventListener("click", function() {
  document.querySelector("nav").classList.toggle("active");
});
function loadFavorites() {
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  const pizzasContainer = document.querySelector(".pizzas");

  if (favorites.length === 0) {
    pizzasContainer.innerHTML = "<h2>No favorite pizzas added yet!</h2>";
    return;
  }

  pizzasContainer.innerHTML = "";

  favorites.forEach((fav) => {
    pizzasContainer.innerHTML += `
        <div class='pizza'>
          <h2 class='pizza-title'>${fav.title}</h2>
          <p class='pizza-publisher'>Published by: ${fav.publisher}</p>
          <img src='${fav.image_url}' alt='${fav.title}' class='pizza-img' />
          <div class="container">
<a class='pizza-links' href='${fav.source_url}' target='_blank'>Details</a>
</div>
        </div>
      `;
  });
}

document.addEventListener("DOMContentLoaded", loadFavorites);


document.getElementById('menu-toggle').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

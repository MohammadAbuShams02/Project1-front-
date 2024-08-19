document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("active");
});

const limit = 6;

async function fetchPizzas(page = 1) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=pizza`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    //random prices
    const pizzasWithPrices = data.recipes.map((pizza) => ({
      ...pizza,
      price: (Math.random() * 10 + 5).toFixed(1), // Random price between $5.0 and $15.0
    }));

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      pizzas: pizzasWithPrices.slice(start, end),
      total: data.recipes.length,
    };
  } catch (error) {
    console.error("Failed to fetch pizzas:", error);
    return { pizzas: [], total: 0 };
  }
}

// Display pizzas on the page
async function displayPizzas(page = 1) {
  document.querySelector(".overlay").classList.remove("d-none"); // Show loader when starting to fetch
  try {
    const { pizzas, total } = await fetchPizzas(page);
    const pizzasContainer = document.querySelector(".pizzas");

    // Clear content
    pizzasContainer.innerHTML = "";

    const pizzaHTML = pizzas
      .map(
        (pizza) => `
      <div class='pizza'>
        <h2 class='pizza-title'>
          ${pizza.title} <span class='price'>$${pizza.price}</span>
        </h2>
        <p class='pizza-publisher'>Published by: ${pizza.publisher}</p>
        <img src='${pizza.image_url}' alt='${pizza.title}' class='pizza-img' data-id="${pizza.recipe_id}"/>
        <div class='pizza-links'>
          <a href='${pizza.source_url}' target='_blank'>details</a>
          <i class="fa-solid fa-heart favorite-btn" data-id="${pizza.recipe_id}" data-title="${pizza.title}" data-publisher="${pizza.publisher}" data-image="${pizza.image_url}" data-source="${pizza.source_url}"></i>
        </div>
      </div>
    `
      )
      .join("");

    // Insert pizza items
    pizzasContainer.innerHTML = pizzaHTML;

    const pizzaImages = document.querySelectorAll(".pizza-img");
 

    document.querySelector(".overlay").classList.add("d-none");

    setupPagination(Math.ceil(total / limit), page);

    initializeModal();
    initializeFavoriteButtons();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(
      ".pizzas"
    ).innerHTML = `<h2>Something went wrong</h2><p>${error.message}</p>`;
    document.querySelector(".overlay").classList.add("d-none");
  }
}



function setupPagination(totalPages, currentPage) {
  const paginationContainer = document.querySelector(".pagination-container");
  let paginationHTML = '<ul class="pagination">';

  paginationHTML += `<li class="page-item ${
    currentPage === 1 ? "disabled" : ""
  }">
    <a class="page-link" href="#" ${
      currentPage > 1 ? `onclick="displayPizzas(${currentPage - 1})"` : ""
    }>&laquo;</a>
  </li>`;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }">
      <a class="page-link" href="#" onclick="displayPizzas(${i})">${i}</a>
    </li>`;
  }

  paginationHTML += `<li class="page-item ${
    currentPage === totalPages ? "disabled" : ""
  }">
    <a class="page-link" href="#" ${
      currentPage < totalPages
        ? `onclick="displayPizzas(${currentPage + 1})"`
        : ""
    }>&raquo;</a>
  </li>`;

  paginationHTML += "</ul>";
  paginationContainer.innerHTML = paginationHTML;
}

function initializeModal() {
  let currentIndex = 0;
  const modal = document.querySelector(".my-modal");
  const closeBtn = document.querySelector(".closeBtn");
  const leftBtn = document.querySelector(".leftBtn");
  const rightBtn = document.querySelector(".rightBtn");
  const allImages = Array.from(document.querySelectorAll(".pizza-img"));

  // Event listener for image click to open modal
  allImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      modal.classList.remove("d-none");
      modal
        .querySelector("img.modal-img")
        .setAttribute("src", image.getAttribute("src"));
      currentIndex = index;
    });
  });

  // Event listener for close button
  closeBtn.addEventListener("click", () => {
    modal.classList.add("d-none");
  });

  // Event listener for right arrow
  rightBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= allImages.length) {
      currentIndex = 0;
    }
    modal
      .querySelector("img.modal-img")
      .setAttribute("src", allImages[currentIndex].getAttribute("src"));
  });

  // Event listener for left arrow
  leftBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = allImages.length - 1;
    }
    modal
      .querySelector("img.modal-img")
      .setAttribute("src", allImages[currentIndex].getAttribute("src"));
  });



  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
      currentIndex++;
      if (currentIndex >= allImages.length) {
        currentIndex = 0;
      }
      modal
        .querySelector("img.modal-img")
        .setAttribute("src", allImages[currentIndex].getAttribute("src"));
    } else if (e.code === "ArrowLeft") {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = allImages.length - 1;
      }
      modal
        .querySelector("img.modal-img")
        .setAttribute("src", allImages[currentIndex].getAttribute("src"));
    } else if (e.code === "Escape") {
      modal.classList.add("d-none");
    }
  });
}

function initializeFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  favoriteButtons.forEach((button) => {
    const pizzaData = {
      title: button.getAttribute("data-title"),
      publisher: button.getAttribute("data-publisher"),
      image_url: button.getAttribute("data-image"),
      source_url: button.getAttribute("data-source"),
      recipe_id: button.getAttribute("data-id"),
    };

    // Check if this pizza is already in favorites
    const isFavorited = favorites.some(
      (fav) => fav.recipe_id === pizzaData.recipe_id
    );

    // If the pizza is already favorited, mark the button as favorited
    if (isFavorited) {
      button.classList.add("favorited");
    }

    button.addEventListener("click", () => {
      if (isFavorited) {
        // Remove pizza from favorites
        favorites = favorites.filter(
          (fav) => fav.recipe_id !== pizzaData.recipe_id
        );
        button.classList.remove("favorited");
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        // Add pizza to favorites
        favorites.push(pizzaData);
        button.classList.add("favorited");
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => displayPizzas(1));

window.onscroll = function () {
  const nav = document.querySelector("header");
  if (window.scrollY > 50) {
    nav.classList.add("scrollNavbar");
  } else {
    nav.classList.remove("scrollNavbar");
  }
};

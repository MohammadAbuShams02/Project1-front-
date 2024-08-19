window.onscroll = function() {
    const nav = document.querySelector("header");
    const dishes = document.querySelector(".featured-dishes");

    if (window.scrollY > dishes.offsetTop) {
        nav.classList.add('scrollNavbar');
    } else {
        nav.classList.remove('scrollNavbar');
    }
}

document.getElementById('menu-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

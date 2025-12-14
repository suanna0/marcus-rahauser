const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav_menu");

hamburger.addEventListener("click", () => {
navMenu.classList.toggle("open");
hamburger.innerHTML = navMenu.classList.contains("open")
  ? "&times;"
  : "&#9776;";
});

document.querySelectorAll(".carousel-container").forEach((container) => {
const carousel = container.querySelector(".carousel");
const images = carousel.querySelectorAll("img");

const navContain = container.nextElementSibling;
const prev = navContain.querySelector(".nav.prev");
const next = navContain.querySelector(".nav.next");

let index = 0;

function showImage(idx) {
  const imageWidth = images[0].clientWidth;
  carousel.style.transform = `translateX(${-idx * imageWidth}px)`;
}

prev.addEventListener("click", () => {
  index = index > 0 ? index - 1 : images.length - 1;
  showImage(index);
});

next.addEventListener("click", () => {
  index = index < images.length - 1 ? index + 1 : 0;
  showImage(index);
});

window.addEventListener("resize", () => showImage(index));
});
document.addEventListener("mousemove", (event) => {
  const cursorImage = document.getElementById("cursor-image");
  cursorImage.style.left = `${event.pageX}px`;
  cursorImage.style.top = `${event.pageY}px`;
  updateCaption();
});

// Carousel functionality
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const captionContainer = document.getElementById("carousel-caption");
const titleContainer = document.getElementById("carousel-title");
const prev = document.querySelector(".nav.prev");
const next = document.querySelector(".nav.next");

let index = 0;

function showImage(idx) {
  const imageWidth = images[0].clientWidth;
  carousel.style.transform = `translateX(${-idx * imageWidth}px)`;
  updateCaption();
}

function updateCaption() {
  const currentImage = images[index];
  const titleText = currentImage.getAttribute("title");
  const captionText = currentImage.getAttribute("caption");
  titleContainer.textContent = titleText;
  captionContainer.textContent = captionText;
}

prev.addEventListener("click", () => {
  index = index > 0 ? index - 1 : images.length - 1;
  showImage(index);
});

next.addEventListener("click", () => {
  index = index < images.length - 1 ? index + 1 : 0;
  showImage(index);
});

// Adjust carousel on window resize
window.addEventListener("resize", () => showImage(index));

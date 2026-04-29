const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav_menu");

function buildNav(navItems) {
  const title = navMenu.querySelector(".title");
  navMenu.innerHTML = "";
  navMenu.appendChild(title);

  navItems.forEach((item) => {
    const btn = document.createElement("button");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.name;
    if (item.target) a.target = item.target;
    btn.appendChild(a);
    navMenu.appendChild(btn);

    if (item.desc && window.location.pathname === item.href) {
      const desc = document.createElement("div");
      desc.className = "description";
      desc.innerHTML = item.desc;
      navMenu.appendChild(desc);
    }

    if (item.spacer) {
      navMenu.appendChild(document.createElement("br"));
    }

    if (item.name === "♫") {
      navMenu.appendChild(document.createElement("br"));
    }

    navMenu.appendChild(document.createElement("br"));
  });

  // Page load: contract in
  navMenu.style.transition = "none";
  navMenu.classList.add("expanding");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      navMenu.style.transition = "";
      navMenu.classList.remove("expanding");
    });
  });

  // Nav link clicks: expand out then navigate
  navMenu.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("target") === "_blank") return;
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      navMenu.classList.add("expanding");
      setTimeout(() => { window.location.href = href; }, 500);
    });
  });
}

fetch("/nav.json")
  .then((res) => res.json())
  .then(buildNav);

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

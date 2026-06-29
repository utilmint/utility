// NAVBAR ELEMENTS
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// -----------------------------
// 1. PAGE LOAD ANIMATION
// -----------------------------
window.addEventListener("load", () => {
  setTimeout(() => {
    navbar.classList.add("loaded");
  }, 200);

  // stagger nav links
  navLinks.forEach((link, index) => {
    link.style.transitionDelay = `${index * 100}ms`;
    link.style.opacity = "0";
    link.style.transform = "translateY(-10px)";

    setTimeout(() => {
      link.style.opacity = "1";
      link.style.transform = "translateY(0)";
    }, 300 + index * 120);
  });
});

// -----------------------------
// 2. SCROLL BEHAVIOR
// -----------------------------
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// -----------------------------
// 3. MOBILE MENU TOGGLE
// -----------------------------
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// -----------------------------
// 4. ACTIVE LINK ON SCROLL
// -----------------------------
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// -----------------------------
// 5. SMOOTH SCROLL ENHANCEMENT
// -----------------------------
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth"
    });
  });
});

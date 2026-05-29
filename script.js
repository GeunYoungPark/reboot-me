// =========================
// RE:boot Homepage Script
// Easy edit file for simple interactions
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const backToTop = document.querySelector(".back-to-top");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// Close mobile menu after clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

// Active menu underline
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 420) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

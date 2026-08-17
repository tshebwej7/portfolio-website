/* =========================================================
   PORTFOLIO WEBSITE
   JIRES TSHEBWE
   MAIN JAVASCRIPT
   ========================================================= */

/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("main section");

const heroContent = document.querySelector(".hero-content");

/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
      menuToggle.setAttribute("aria-label", "Close navigation menu");

      menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

/* =========================================================
   3. CLOSE MOBILE MENU AFTER CLICKING A LINK
   ========================================================= */

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navLinks || !menuToggle) {
      return;
    }

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

/* =========================================================
   4. ACTIVE NAVIGATION LINK
   ========================================================= */

const updateActiveNavigation = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.offsetHeight;

    const scrollPosition = window.scrollY;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navigationLinks.forEach((link) => {
    link.classList.remove("active-link");

    const targetSection = link.getAttribute("href");

    if (targetSection === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
};

window.addEventListener("scroll", updateActiveNavigation);

/* =========================================================
   5. SCROLL REVEAL
   ========================================================= */

const revealElements = [
  ...document.querySelectorAll(".section"),
  heroContent,
].filter(Boolean);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   6. INITIAL HERO ANIMATION
   ========================================================= */

window.addEventListener("load", () => {
  if (heroContent) {
    heroContent.classList.add("active");
  }

  updateActiveNavigation();
});

/* =========================================================
   7. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navLinks &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Open navigation menu");

      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  }
});

/* =========================================================
   8. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {
  if (!navLinks || !menuToggle) {
    return;
  }

  const clickedInsideNavigation = navLinks.contains(event.target);

  const clickedMenuButton = menuToggle.contains(event.target);

  if (
    navLinks.classList.contains("active") &&
    !clickedInsideNavigation &&
    !clickedMenuButton
  ) {
    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

/* =========================================================
   9. CURRENT YEAR
   ========================================================= */

const footerYear = document.querySelector(".footer-year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

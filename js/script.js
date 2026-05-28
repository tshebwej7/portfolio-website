/* =========================
   MOBILE MENU TOGGLE
========================= */

const menuToggle = document.querySelector('.menu-toggle');

const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {

  navLinks.classList.toggle('active');

});

/* =========================
   CLOSE MOBILE MENU
========================= */

const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {

  link.addEventListener('click', () => {

    navLinks.classList.remove('active');

  });

});

/* =========================
   ACTIVE NAVIGATION LINKS
========================= */

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if (scrollY >= sectionTop - 200) {

      current = section.getAttribute('id');

    }

  });

  navItems.forEach(link => {

    link.classList.remove('active-link');

    if (link.getAttribute('href') === `#${current}`) {

      link.classList.add('active-link');

    }

  });

});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
  '.section, .hero-content'
);

const revealOnScroll = () => {

  revealElements.forEach(element => {

    const windowHeight = window.innerHeight;

    const revealTop = element.getBoundingClientRect().top;

    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {

      element.classList.add('active');

    }

  });

};

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();
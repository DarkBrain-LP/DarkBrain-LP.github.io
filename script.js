// ============================================================
// Emmanuel Yovo — Portfolio interactions
// Vanilla JS, no dependencies.
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- typing effect for hero role line ---------- */
const roles = document.documentElement.lang === 'fr'
  ? ['Ingénieur logiciel embarqué', 'C / C++ sur ARM Cortex-M', 'Systèmes temps réel', 'FreeRTOS & électronique de puissance', 'Mobilité internationale']
  : ['Embedded Firmware Engineer', 'C / C++ on ARM Cortex-M', 'Real-Time Control Systems', 'FreeRTOS & Power Electronics', 'Open to Relocation Worldwide'];
const typedEl = document.getElementById('typedRole');

if (typedEl) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedEl.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 55);
    }
    tick();
  }
}

/* ---------- scroll-reveal for sections ---------- */
const revealTargets = document.querySelectorAll(
  '.about-grid, .skills-grid, .timeline, .projects-grid, .edu-grid, .contact-grid'
);

if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => el.classList.add('reveal-init'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => io.observe(el));

  // Safety net: guarantee content is never permanently stuck invisible
  // (e.g. very fast programmatic scrolls, unusual browser throttling).
  setTimeout(() => {
    revealTargets.forEach(el => el.classList.add('reveal-in'));
  }, 4000);
}

/* ---------- active nav link on scroll ---------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 140;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

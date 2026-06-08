/* ── Theme toggle ─────────────────────────── */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── Navbar scroll effect ─────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
}, { passive: true });

/* ── Active nav link ──────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ── Mobile menu ──────────────────────────── */
const hamburger  = document.getElementById('navHamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinksEl.classList.remove('open'))
);

/* ── Typing animation ─────────────────────── */
const phrases = [
  'CS Student',
  'Full-Stack Developer',
  'Problem Solver',
  'Software Engineer',
];
const typedEl = document.getElementById('typedText');
let pi = 0, ci = 0, deleting = false;

function type() {
  const word = phrases[pi];
  typedEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);

  let delay = deleting ? 55 : 100;

  if (!deleting && ci === word.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

/* ── Scroll-reveal via IntersectionObserver ─ */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

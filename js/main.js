// — Navbar scroll —
const navbar = document.getElementById('navbar');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      ticking = false;
    });
    ticking = true;
  }
});

// — Mobile menu —
const burger = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// — Smooth scroll —
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const el = document.querySelector(anchor.getAttribute('href'));
    if (el) {
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// — Contact form —
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const txt = btn.textContent;
    btn.textContent = 'Sent \u2014 we\u2019ll be in touch.';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    setTimeout(() => {
      btn.textContent = txt;
      btn.disabled = false;
      btn.style.opacity = '1';
      form.reset();
    }, 3000);
  });
}

// — Scroll reveal —
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

const stagger = (selector, base = 0) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${base + i * 0.06}s, transform 0.5s ease ${base + i * 0.06}s`;
    reveal.observe(el);
  });
};

stagger('.pblock');
stagger('.how__step');
stagger('.pricing__card');
stagger('.sector');
stagger('.problem__item');
stagger('.scale__col');

// Inject vis class
const s = document.createElement('style');
s.textContent = '.vis{opacity:1!important;transform:none!important}';
document.head.appendChild(s);

// — Readout counter animation —
const readoutRows = document.querySelectorAll('.readout__row dd');
const readoutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.closest('.hero__readout').classList.add('readout--visible');
      readoutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const readout = document.querySelector('.hero__readout');
if (readout) readoutObserver.observe(readout);

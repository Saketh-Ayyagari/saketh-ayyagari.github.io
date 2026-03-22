// Scroll-reveal animations
// Only opt sections into the hidden/reveal animation if IntersectionObserver
// is available and the page is not already scrolled (i.e. a real browser load).
const sections = document.querySelectorAll('.section');

if ('IntersectionObserver' in window) {
  // Add the animation class so CSS hides them — but only now, via JS
  sections.forEach(s => s.classList.add('js-animate'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(s => observer.observe(s));
}

// Active nav link highlight on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sectionEls = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';
  sectionEls.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

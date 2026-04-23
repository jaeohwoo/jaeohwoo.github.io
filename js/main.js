document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const cursorGlow = document.getElementById('cursorGlow');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('active');
    });
  }

  const filters = document.querySelectorAll('.pub-filter');
  const pubItems = document.querySelectorAll('.pub-item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      const type = filter.dataset.filter;
      pubItems.forEach(item => {
        item.classList.toggle('hidden', type !== 'all' && item.dataset.type !== type);
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll(
    '.section-header, .pub-item, .news-card, .teaching-group, ' +
    '.honors-card, .about-text, .about-sidebar, .contact-card, ' +
    '.edu-card, .career-card, .hero-stats'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});

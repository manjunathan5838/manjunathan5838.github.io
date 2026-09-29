// Manjunathan D — Portfolio
// Small progressive enhancements. The page works fully without JavaScript.

(function () {
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    // ---- Mobile menu ----
    var toggle = document.querySelector('.nav__toggle');
    var links = document.getElementById('nav-links');

    function closeMenu() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && links.classList.contains('is-open')) {
          closeMenu();
          toggle.focus();
        }
      });
    }

    // ---- Highlight the nav link for the section in view ----
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
    var sections = navLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }

    // ---- Reveal on scroll ----
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // ---- Current year in footer ----
    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  });
})();

// ─── Mobile nav ─────────────────────────────────────────────────────────────
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = !nav.hidden;
    nav.hidden = open;
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  });

  document.addEventListener('click', function (e) {
    if (!nav.hidden && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !nav.hidden) {
      nav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.focus();
    }
  });
})();

// ─── Header shadow on scroll ─────────────────────────────────────────────────
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
})();

// ─── Scroll reveal ───────────────────────────────────────────────────────────
(function () {
  var targets = document.querySelectorAll('[data-reveal], [data-reveal-group]');
  if (!targets.length) return;

  // Skip animation for users who prefer reduced motion or lack IntersectionObserver
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reducedMotion) {
    targets.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();

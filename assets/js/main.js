// Mobile nav toggle
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

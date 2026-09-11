/**
 * GigiG & Treasures — product.js
 * Carousel navigation + accordion toggle.
 * Data comes from window.PRODUCT_DATA set by the product layout.
 */
(function () {
  'use strict';

  // ── Carousel ──────────────────────────────────────────────────────────────
  var track    = document.getElementById('carousel-track');
  var dots     = document.querySelectorAll('.carousel-dot');
  var thumbs   = document.querySelectorAll('.carousel-thumb');
  var prevBtn  = document.querySelector('.carousel-btn--prev');
  var nextBtn  = document.querySelector('.carousel-btn--next');

  if (!track) return; // Not on a product page

  var total       = dots.length;
  var current     = 0;

  function goTo(n) {
    current = ((n % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
    thumbs.forEach(function (t, i) {
      t.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); });
  });

  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { goTo(i); });
  });

  // Touch / swipe
  var touchStartX = 0;
  var carousel = track.parentElement;
  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });


  // ── Accordions ────────────────────────────────────────────────────────────
  var accordionBtns = document.querySelectorAll('.accordion-btn');

  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body = btn.nextElementSibling;
      var icon = btn.querySelector('.accordion-icon');
      var isOpen = body.classList.contains('open');

      body.classList.toggle('open', !isOpen);
      if (icon) icon.textContent = isOpen ? '+' : '−';
    });
  });


  // ── Share button ──────────────────────────────────────────────────────────
  var shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var title = shareBtn.dataset.title || document.title;
      if (navigator.share) {
        navigator.share({ title: title, url: location.href });
      } else {
        navigator.clipboard.writeText(location.href).then(function () {
          alert('Link copied to clipboard!');
        }).catch(function () {
          alert('Copy this link: ' + location.href);
        });
      }
    });
  }

})();

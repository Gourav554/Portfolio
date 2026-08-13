/* =========================================================
   SCRIPT.JS — Main orchestrator: mobile navigation, footer
   year, and any small glue logic that doesn't belong in a
   dedicated module.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- Mobile Hamburger Menu ---------------- */
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    function closeMenu() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu whenever a nav link is tapped (mobile UX).
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click.
    document.addEventListener('click', function (e) {
      if (!navMenu.classList.contains('active')) return;
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------- Footer Year ---------------- */
  function initFooterYear() {
    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initFooterYear();
  });
})();
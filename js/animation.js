/* =========================================================
   ANIMATION.JS — Scroll reveal, floating particles, cursor
   glow, scroll progress bar, ripple buttons, navbar state,
   skill progress bars, and back-to-top button.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- Scroll Reveal ---------------- */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('active'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Skill Progress Bars ---------------- */
  function initProgressBars() {
    var bars = document.querySelectorAll('.progress-fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (bar) {
        bar.style.width = (bar.getAttribute('data-percent') || '0') + '%';
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var bar = entry.target;
            bar.style.width = (bar.getAttribute('data-percent') || '0') + '%';
            obs.unobserve(bar);
          }
        });
      },
      { threshold: 0.4 }
    );

    bars.forEach(function (bar) { observer.observe(bar); });
  }

  /* ---------------- Scroll Progress Bar ---------------- */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = percent + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------------- Sticky Navbar + Active Link ---------------- */
  function initNavbarState() {
    var navbar = document.getElementById('navbar');
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
      if (!navbar) return;
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('data-nav') === id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------------- Cursor Glow (desktop only) ---------------- */
  function initCursorGlow() {
    var glow = document.getElementById('cursorGlow');
    if (!glow) return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      glow.style.display = 'none';
      return;
    }

    window.addEventListener('mousemove', function (e) {
      glow.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) translate(-50%, -50%)';
    });
  }

  /* ---------------- Ripple Button Effect ---------------- */
  function initRipple() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.ripple');
      if (!btn) return;

      var rect = btn.getBoundingClientRect();
      var circle = document.createElement('span');
      var size = Math.max(rect.width, rect.height);

      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';

      var previousPosition = getComputedStyle(btn).position;
      if (previousPosition === 'static') btn.style.position = 'relative';

      btn.appendChild(circle);
      circle.addEventListener('animationend', function () {
        circle.remove();
      });
    });
  }

  /* ---------------- Back To Top ---------------- */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener(
      'scroll',
      function () {
        btn.classList.toggle('visible', window.scrollY > 500);
      },
      { passive: true }
    );

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Floating White Particles ---------------- */
  function initParticles() {
    var canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = window.innerWidth < 768 ? 35 : 70;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.6 + 0.4,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.5 + 0.15
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + p.alpha + ')';
        ctx.fill();
      });

      if (!reducedMotion) requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', function () {
      resize();
      createParticles();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initProgressBars();
    initScrollProgress();
    initNavbarState();
    initCursorGlow();
    initRipple();
    initBackToTop();
    initParticles();
  });
})();
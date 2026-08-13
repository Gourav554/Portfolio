/* =========================================================
   PROJECT-FILTER.JS — Category filtering, live search, and
   the "View Details" popup modal for the Projects section.
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var searchInput = document.getElementById('projectSearch');
    var cards = document.querySelectorAll('.project-card');
    var noResults = document.getElementById('noResults');

    var activeFilter = 'all';
    var searchTerm = '';

    /**
     * Re-applies the current filter + search combination to every card.
     */
    function applyFilters() {
      var visibleCount = 0;

      cards.forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(' ');
        var title = (card.getAttribute('data-title') || '').toLowerCase();
        var desc = (card.getAttribute('data-desc') || '').toLowerCase();

        var matchesFilter = activeFilter === 'all' || categories.indexOf(activeFilter) !== -1;
        var matchesSearch = searchTerm === '' || title.indexOf(searchTerm) !== -1 || desc.indexOf(searchTerm) !== -1;

        var show = matchesFilter && matchesSearch;
        card.classList.toggle('hidden-card', !show);
        if (show) visibleCount++;
      });

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyFilters();
      });
    }

    /* ---------------- Project Details Modal ---------------- */
    var modal = document.getElementById('projectModal');
    var modalClose = document.getElementById('modalClose');
    var modalImg = document.getElementById('modalImg');
    var modalTitle = document.getElementById('modalTitle');
    var modalDesc = document.getElementById('modalDesc');
    var modalTech = document.getElementById('modalTech');
    var modalFeatures = document.getElementById('modalFeatures');
    var modalDemo = document.getElementById('modalDemo');
    var modalGithub = document.getElementById('modalGithub');
    var lastFocusedEl = null;

    function openModal(card) {
      var title = card.getAttribute('data-title') || '';
      var desc = card.getAttribute('data-desc') || '';
      var tech = (card.getAttribute('data-tech') || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
      var features = (card.getAttribute('data-features') || '').split('|').map(function (f) { return f.trim(); }).filter(Boolean);
      var demo = card.getAttribute('data-demo') || '#';
      var github = card.getAttribute('data-github') || '#';
      var img = card.getAttribute('data-img') || '';

      modalImg.src = img;
      modalImg.alt = title + ' preview';
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      modalTech.innerHTML = '';
      tech.forEach(function (t) {
        var span = document.createElement('span');
        span.textContent = t;
        modalTech.appendChild(span);
      });

      modalFeatures.innerHTML = '';
      features.forEach(function (f) {
        var li = document.createElement('li');
        li.textContent = f;
        modalFeatures.appendChild(li);
      });

      modalDemo.href = demo;
      modalGithub.href = github;

      lastFocusedEl = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    cards.forEach(function (card) {
      var viewBtn = card.querySelector('.btn-view-details');
      if (viewBtn) {
        viewBtn.addEventListener('click', function () {
          openModal(card);
        });
      }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });
  });
})();
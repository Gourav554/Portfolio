/* =========================================================
   TYPING.JS — Animated typing/erasing effect for the hero role
   ========================================================= */

(function () {
  'use strict';

  function initTypingEffect() {
    var target = document.getElementById('typingText');
    if (!target) return;

    var words = (target.getAttribute('data-words') || '')
      .split(',')
      .map(function (w) { return w.trim(); })
      .filter(Boolean);

    if (words.length === 0) return;

    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    var TYPE_SPEED = 90;
    var DELETE_SPEED = 45;
    var PAUSE_AFTER_WORD = 1400;
    var PAUSE_AFTER_DELETE = 400;

    function tick() {
      var currentWord = words[wordIndex];
      var delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

      if (!isDeleting) {
        charIndex++;
        target.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          delay = PAUSE_AFTER_WORD;
        }
      } else {
        charIndex--;
        target.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = PAUSE_AFTER_DELETE;
        }
      }

      setTimeout(tick, delay);
    }

    setTimeout(tick, 500);
  }

  document.addEventListener('DOMContentLoaded', initTypingEffect);
})();
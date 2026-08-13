/* =========================================================
   CONTACT.JS — Client-side validation & submit handling for
   the contact form. No backend is wired up by default; swap
   the TODO block below for a real API / Formspree / EmailJS
   call when you're ready to receive messages.
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var successMsg = document.getElementById('formSuccess');

    var fields = {
      name: {
        input: document.getElementById('name'),
        error: document.getElementById('nameError'),
        validate: function (v) {
          return v.trim().length >= 2 ? '' : 'Please enter your full name.';
        }
      },
      email: {
        input: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: function (v) {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(v.trim()) ? '' : 'Please enter a valid email address.';
        }
      },
      phone: {
        input: document.getElementById('phone'),
        error: document.getElementById('phoneError'),
        validate: function (v) {
          if (v.trim() === '') return ''; // phone is optional
          var re = /^[+]?[\d\s()-]{7,}$/;
          return re.test(v.trim()) ? '' : 'Please enter a valid phone number.';
        }
      },
      subject: {
        input: document.getElementById('subject'),
        error: document.getElementById('subjectError'),
        validate: function (v) {
          return v.trim().length >= 3 ? '' : 'Please add a short subject.';
        }
      },
      message: {
        input: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: function (v) {
          return v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.';
        }
      }
    };

    function validateField(key) {
      var field = fields[key];
      var message = field.validate(field.input.value);
      field.error.textContent = message;
      field.input.closest('.form-group').classList.toggle('invalid', Boolean(message));
      return message === '';
    }

    Object.keys(fields).forEach(function (key) {
      fields[key].input.addEventListener('blur', function () {
        validateField(key);
      });
      fields[key].input.addEventListener('input', function () {
        if (fields[key].input.closest('.form-group').classList.contains('invalid')) {
          validateField(key);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = Object.keys(fields).every(function (key) {
        return validateField(key);
      });

      if (!isValid) {
        successMsg.hidden = true;
        return;
      }

      /* ---------------------------------------------------
         TODO: Replace this block with a real submission,
         e.g. fetch('https://formspree.io/f/your-id', {...})
         or an EmailJS / custom backend call.
      --------------------------------------------------- */
      var submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        successMsg.hidden = false;
        form.reset();

        Object.keys(fields).forEach(function (key) {
          fields[key].input.closest('.form-group').classList.remove('invalid');
          fields[key].error.textContent = '';
        });
      }, 900);
    });
  });
})();
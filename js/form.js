/* ==========================================================================
   form.js — client-side validation for contact / apply / newsletter forms
   Add data-validate to a <form>. Fields validated by type + [required].
   ========================================================================== */
(function () {
  'use strict';

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^[+]?[\d\s().-]{7,}$/;

  function validateField(field) {
    const input = field.querySelector('input, select, textarea');
    if (!input) return true;
    let ok = true;
    const val = input.value.trim();

    if (input.hasAttribute('required') && !val) ok = false;
    else if (val && input.type === 'email' && !emailRe.test(val)) ok = false;
    else if (val && input.type === 'tel' && !phoneRe.test(val)) ok = false;

    field.classList.toggle('invalid', !ok);
    return ok;
  }

  document.querySelectorAll('form[data-validate]').forEach(form => {
    const fields = Array.from(form.querySelectorAll('.field'));
    const status = form.querySelector('.form__status');

    fields.forEach(f => {
      const input = f.querySelector('input, select, textarea');
      input && input.addEventListener('blur', () => validateField(f));
      input && input.addEventListener('input', () => { if (f.classList.contains('invalid')) validateField(f); });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      fields.forEach(f => { if (!validateField(f)) valid = false; });

      if (!valid) {
        if (status) { status.textContent = 'Please correct the highlighted fields.'; status.classList.remove('ok'); }
        const firstBad = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        firstBad && firstBad.focus();
        return;
      }
      // Static site: no backend — simulate success.
      if (status) { status.textContent = 'Thank you! Your message has been sent.'; status.classList.add('ok'); }
      form.reset();
    });
  });
})();

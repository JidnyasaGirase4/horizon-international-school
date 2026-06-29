/* ==========================================================================
   counter.js — animate counters when they scroll into view
   Markup: <span class="counter__num" data-target="5000" data-suffix="+">0</span>
   ========================================================================== */
(function () {
  'use strict';
  const nums = document.querySelectorAll('.counter__num[data-target]');
  if (!nums.length) return;

  function run(el) {
    const target = parseFloat(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1800;
    let startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  } else {
    nums.forEach(run);
  }
})();

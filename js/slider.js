/* ==========================================================================
   slider.js — hero background slider + testimonial slider
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Hero slider ---------- */
  const hero = document.querySelector('.hero__slides');
  if (hero) {
    const slides = Array.from(hero.querySelectorAll('.hero__slide'));
    const dotsWrap = document.querySelector('.hero__dots');
    let i = 0, timer;

    const dots = slides.map((_, idx) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
      b.addEventListener('click', () => go(idx, true));
      dotsWrap && dotsWrap.appendChild(b);
      return b;
    });

    function go(n, manual) {
      slides[i].classList.remove('active');
      dots[i] && dots[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      dots[i] && dots[i].classList.add('active');
      if (manual) restart();
    }
    const next = () => go(i + 1);
    const start = () => { if (slides.length > 1) timer = setInterval(next, 6000); };
    const restart = () => { clearInterval(timer); start(); };

    go(0); start();
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', start);
  }

  /* ---------- Testimonial slider (paged, 2 per view, scrolls 2 at a time) ---------- */
  const tslider = document.querySelector('.tslider');
  if (tslider) {
    const track = tslider.querySelector('.tslider__track');
    const slides = Array.from(track.children);
    const navWrap = tslider.querySelector('.tslider__nav');
    let perView = 2, page = 0, timer, dots = [];

    const calcPerView = () => (window.innerWidth <= 768 ? 1 : 2);
    const pageCount = () => Math.ceil(slides.length / perView);

    function buildDots() {
      if (!navWrap) return;
      navWrap.innerHTML = '';
      dots = [];
      for (let p = 0; p < pageCount(); p++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Testimonials page ' + (p + 1));
        b.addEventListener('click', () => go(p, true));
        navWrap.appendChild(b);
        dots.push(b);
      }
    }
    function go(p, manual) {
      const pc = pageCount();
      page = (p + pc) % pc;
      track.style.transform = `translateX(-${page * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === page));
      if (manual) restart();
    }
    function setup() {
      perView = calcPerView();
      slides.forEach(s => { s.style.flexBasis = (100 / perView) + '%'; });
      buildDots();
      if (page >= pageCount()) page = 0;
      go(page);
    }
    const start = () => { if (pageCount() > 1) timer = setInterval(() => go(page + 1), 5000); };
    const restart = () => { clearInterval(timer); start(); };

    setup(); start();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(setup, 200); });
    tslider.addEventListener('mouseenter', () => clearInterval(timer));
    tslider.addEventListener('mouseleave', start);
  }
})();

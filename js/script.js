/* ==========================================================================
   script.js — core behaviors
   Sticky nav · mobile menu · scroll-to-top · smooth scroll ·
   active nav highlight · scroll reveal · lazy loading · button ripple
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggle && menu) {
    const close = () => { toggle.classList.remove('is-open'); menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- Active nav highlight (by current page) ---------- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === 'index.html' && (href === 'index.html' || href === './' || href === '/'))) {
      a.classList.add('active');
    }
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ---------- Scroll-to-top button ---------- */
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500), { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Lazy loading images ---------- */
  const lazies = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window && lazies.length) {
    const lio = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const img = en.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazies.forEach(img => lio.observe(img));
  } else {
    lazies.forEach(img => { img.src = img.dataset.src; });
  }

  /* ---------- Button ripple ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + 'px';
      r.style.left = (e.clientX - rect.left - size / 2) + 'px';
      r.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__item').forEach(item => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(isOpen));
      a.style.maxHeight = isOpen ? a.scrollHeight + 'px' : null;
      // close siblings within same .faq group
      const group = item.closest('.faq');
      if (group && isOpen) {
        group.querySelectorAll('.faq__item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const oa = other.querySelector('.faq__a');
            const oq = other.querySelector('.faq__q');
            if (oa) oa.style.maxHeight = null;
            if (oq) oq.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });

  /* ---------- Footer year ---------- */
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ==========================================================================
   gallery.js — category filter + lightbox popup (with prev/next + keyboard)
   ========================================================================== */
(function () {
  'use strict';

  const grid = document.querySelector('.gallery__grid');
  if (!grid) return;

  /* ---------- Filter ---------- */
  const filterBtns = document.querySelectorAll('.gallery__filters button');
  const items = Array.from(grid.querySelectorAll('.gallery__item'));

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(it => {
        const show = cat === 'all' || it.dataset.category === cat;
        it.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const box = document.querySelector('.lightbox');
  if (!box) return;
  const boxImg = box.querySelector('img');
  let visible = [];     // currently visible items
  let current = 0;

  function open(item) {
    visible = items.filter(it => it.style.display !== 'none');
    current = visible.indexOf(item);
    show();
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function show() {
    const img = visible[current].querySelector('img');
    boxImg.src = img.dataset.src || img.src;
    boxImg.alt = img.alt || '';
  }
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
  function move(dir) { current = (current + dir + visible.length) % visible.length; show(); }

  items.forEach(it => it.addEventListener('click', () => open(it)));
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', () => move(-1));
  box.querySelector('.lightbox__next').addEventListener('click', () => move(1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });
})();

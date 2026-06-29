# School Website — Implementation Plan

A phased build plan for the static multi-page school website. See
[requirements.txt](requirements.txt) for the full spec.

## Guiding principles
- **Mobile-first**, then scale up through the 5 breakpoints.
- Build the **design system + shared layout first**, then pages, then JS behaviors.
- Reuse the same header/nav/footer markup across every page.
- No frameworks, no build step — plain HTML/CSS/JS.

---

## Phase 0 — Scaffolding
- Create folder structure (`css/`, `js/`, `images/`, `videos/`, `assets/icons/`, `assets/fonts/`).
- Create empty stubs for all 9 HTML pages and 5 JS files.
- Wire up Google Fonts (Poppins, Playfair Display) and an icon set.

## Phase 1 — Design system (`css/style.css`)
- CSS custom properties for the color palette and spacing scale.
- Typography, buttons (incl. ripple), card base, container/grid utilities.
- `css/animations.css`: fade in, slide up, zoom in, hover scale, card lift, counter.
- `css/responsive.css`: media queries for 1440 / 1024 / 768 / 480.

## Phase 2 — Shared layout
- Top header bar (phone, email, admission, socials).
- Sticky navigation + mobile hamburger menu.
- Footer (quick links, socials, newsletter).
- Scroll-to-top button.

## Phase 3 — Homepage (`index.html`)
Build all 21 sections in order (hero → footer). This page exercises most
components; later pages reuse them.

## Phase 4 — Inner pages
about · academics · admissions · campus · gallery · events · achievements · contact.
Reuse homepage components; add page-specific sections per the spec.

## Phase 5 — JavaScript behaviors
- `script.js` — sticky nav, mobile menu, scroll-to-top, smooth scroll,
  active nav highlight, scroll reveal (IntersectionObserver), lazy loading.
- `slider.js` — hero slider + testimonial slider.
- `counter.js` — animated counters (trigger on scroll into view).
- `gallery.js` — category filter + lightbox.
- `form.js` — contact / apply form validation.

## Phase 6 — Polish & QA
- Cross-browser + responsive pass on all breakpoints.
- Accessibility: ARIA, keyboard nav, focus states, alt text, contrast.
- Performance: compress images, verify lazy loading, minimize blocking JS.
- SEO meta + Open Graph tags per page.
- Placeholder content/images swapped for real assets.

---

## Suggested build order (dependency-aware)
1. Phase 0 scaffold
2. Phase 1 design system → 3. Phase 2 shared layout
4. Phase 3 homepage → 5. Phase 5 JS (as sections need them)
6. Phase 4 inner pages → 7. Phase 6 QA

## Definition of done
- All JS feature checklist items in [requirements.txt](requirements.txt) pass.
- Every page responsive across all 5 breakpoints.
- No console errors; site previewable via `python -m http.server`.

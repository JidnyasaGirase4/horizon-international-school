# Horizon International School — Website

A fully responsive, multi-page **static school website** built with plain
**HTML, CSS, and JavaScript** — no frameworks and no build step. It features a
reusable design system, animated UI, and interactive components like sliders,
counters, a filterable gallery, and form validation.

🔗 **Live demo:** _(Netlify link — see below)_

---

## ✨ Features

- **Mobile-first, fully responsive** across 5 breakpoints (1440 / 1024 / 768 / 480).
- **Reusable design system** — CSS custom properties for colors, spacing, and typography.
- **Sticky navigation** with a mobile hamburger menu and active-link highlighting.
- **Hero & testimonial sliders** (`slider.js`).
- **Animated counters** that trigger on scroll (`counter.js`).
- **Filterable image gallery** with a lightbox (`gallery.js`).
- **Contact / admission form** with client-side validation (`form.js`).
- **Scroll reveal** animations via IntersectionObserver, lazy-loaded images, and smooth scrolling.
- **SEO + Open Graph** meta tags and accessible markup (ARIA, keyboard nav, alt text).

## 📄 Pages

`index` · `about` · `academics` · `admissions` · `campus` · `gallery` ·
`events` · `achievements` · `contact`

## 📁 Project structure

```
.
├── index.html              # Homepage
├── about.html              # Inner pages...
├── academics.html
├── admissions.html
├── campus.html
├── gallery.html
├── events.html
├── achievements.html
├── contact.html
├── css/
│   ├── style.css           # Design system + components
│   ├── animations.css      # Keyframe animations
│   └── responsive.css      # Media queries
├── js/
│   ├── script.js           # Nav, scroll reveal, smooth scroll
│   ├── slider.js           # Hero + testimonial sliders
│   ├── counter.js          # Animated counters
│   ├── gallery.js          # Filter + lightbox
│   └── form.js             # Form validation
├── assets/                 # Icons & fonts
├── images/
├── videos/
├── PLAN.md                 # Build plan
└── requirements.txt        # Full spec
```

## 🚀 Running locally

No build step required. Just serve the folder with any static server:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## 🛠️ Tech stack

- HTML5
- CSS3 (custom properties, Flexbox, Grid, media queries)
- Vanilla JavaScript (ES6, IntersectionObserver)
- Google Fonts (Poppins, Playfair Display)

## 📦 Deployment

Deployed as a static site on **[Netlify](https://www.netlify.com/)**. Any push
to the repository can be configured to trigger an automatic redeploy.

---

© Horizon International School. Built as a personal static-website project.

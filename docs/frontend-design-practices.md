# Frontend Design Practices for AI-Assisted Development
## Guidelines for Claude to produce consistent, high-quality code on Kay's Originals

---

## The Three Pillars

1. **CSS Custom Properties** — Everything definable, everything reusable
2. **Semantic HTML** — Self-documenting structure
3. **IIFE Modules** — Clear JavaScript boundaries, predictable patterns

---

## CSS Architecture

### Layer Order (in `css/styles.css`)

```
Layer 0: Design Tokens (:root)
Layer 1: Base Typography (h1-h6, p, a, body)
Layer 2: Layout & Grid (main, container, section)
Layer 3: Navigation (header, nav, hamburger)
Layer 4: Components (cards, buttons, forms) — alphabetical by feature
Layer 5: Utilities & State (.is-active, .is-hidden, .text-center)
Layer 6: Responsive Overrides (@media at the end only)
```

### Design Token Naming

```css
:root {
  /* Colors */
  --charcoal: #1e1e1e;
  --blue: #1a8fc4;

  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Typography */
  --font-heading: 'DM Serif Display', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;
  --size-h1: 2.5rem;
  --size-h2: 2rem;
  --size-h3: 1.5rem;

  /* Z-index scale */
  --z-base: 1;
  --z-dropdown: 100;
  --z-modal: 1000;
}
```

### Component Class Naming (BEM-lite)

```css
.artwork-card { }              /* Block */
.artwork-card__image { }       /* Element */
.artwork-card__title { }
.artwork-card--featured { }    /* Modifier (use sparingly) */

/* State classes */
.is-active { }
.is-hidden { display: none !important; }
.has-error { }
```

### Animation Rules

- Animate ONLY `transform` and `opacity` — never `transition-all`
- Use `will-change` sparingly (only on actively animated elements like the slideshow)
- Duration: 200–300ms for hover states, 500–700ms for page-level transitions
- **Kay's preference: keep animations subtle and simple.** No parallax, no flashy effects, no dramatic entrances. Subtle fade-ins and gentle hover lifts are the limit. When in doubt, do less.

```css
/* Good */
.artwork-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.artwork-card:hover {
  transform: translateY(-8px);
}

/* Bad */
.artwork-card {
  transition: all 0.3s ease; /* Never use transition-all */
}
```

### Responsive: Mobile-First

```css
/* Base (mobile, 0px+) */
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Tablet (640px+) */
@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## HTML Patterns

### Semantic Structure

```html
<header role="banner">
  <nav aria-label="Main navigation"></nav>
</header>

<main>
  <section class="section-hero" aria-labelledby="hero-title">
    <h1 id="hero-title">Browse Artwork</h1>
  </section>

  <section class="section-gallery">
    <h2>All Artwork</h2>
    <ul class="gallery-grid" role="list">
      <li>
        <article class="artwork-card">
          <img alt="Description of artwork" />
          <h3 class="artwork-card__title">Title</h3>
        </article>
      </li>
    </ul>
  </section>
</main>

<footer role="contentinfo"></footer>
```

### Accessibility

```html
<!-- Skip link (first element in body) -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
/* Focus states — always defined */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}
```

```html
<!-- Proper alt text (no "image of" prefix) -->
<img alt="Abstract blue painting titled Ocean Drift by Sarah Chen" />

<!-- Form labels -->
<label for="email">Email Address</label>
<input id="email" type="email" required />
```

---

## JavaScript Patterns

### IIFE Module (current pattern — keep it)

```javascript
var ModuleName = (function() {
  // Private
  var cache = {};

  function cacheDOM() {
    cache.container = document.querySelector('.container');
  }

  function bindEvents() {
    cache.container.addEventListener('click', handleClick);
  }

  function handleClick(e) {
    // handle it
  }

  // Public API
  return {
    init: function() {
      cacheDOM();
      bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  ModuleName.init();
});
```

### Event Handling

```javascript
// Good — named functions, explicit binding
function handleNavToggle(e) {
  e.preventDefault();
  toggleMenu();
}
navToggle.addEventListener('click', handleNavToggle);

// Avoid — arrow functions lose `this` context
button.addEventListener('click', () => this.method());
```

---

## Red Flags That Confuse AI

| Bad Pattern | Better Pattern |
|-------------|---------------|
| Magic numbers (`margin: 37px`) | CSS tokens (`var(--space-lg)`) |
| Mixed naming (`el`, `container`, `wrapper`) | Consistent component names |
| `!important` everywhere | Proper cascade layering |
| Complex chains (`nav > ul > li > a`) | Direct class selectors |
| State managed multiple ways (class + inline + data-attr) | Pick one: prefer classes |
| Styles scattered across multiple files | Single `styles.css`, layered |
| `transition: all` | Explicit property transitions |
| Hardcoded hex values in CSS rules | Always reference `:root` tokens |

---

## Notes on This Codebase

- IIFE pattern in `js/main.js` and `js/data.js` is correct — maintain it
- `css/styles.css` uses CSS custom properties in `:root` — never add inline styles or hardcoded hex values
- `window.PAGE_BASE` handles path differences between root (`index.html`) and `pages/` — set per page
- Fonts loaded via Google Fonts CDN with `font-display: swap`
- `js/data.js` (`KaysData` module) is the single source of truth for artist/artwork data — never duplicate data elsewhere
- An artwork cannot exist without an artist — always maintain this relationship in data

# Analysis Checklist — Kay's Originals Codebase

Use this checklist when running Analyze or Report mode. Check every item against the target file(s). Each issue must include a file:line reference and a concrete fix.

---

## JavaScript Checklist

### ES5 Compliance (High Priority if violated)
- [ ] No `const` or `let` — must use `var`
- [ ] No arrow functions (`=>`) — must use `function` declarations or expressions
- [ ] No template literals (backtick strings) — must use string concatenation (`+`)
- [ ] No destructuring (`const { a, b } = obj` or `const [x] = arr`)
- [ ] No spread operator (`...`)
- [ ] No `class` keyword
- [ ] No `import` / `export` statements
- [ ] No optional chaining (`?.`) or nullish coalescing (`??`)

### IIFE Module Pattern (High Priority if violated)
- [ ] `data.js` exports a named IIFE: `var KaysData = (function() { 'use strict'; ... return { ... }; })();`
- [ ] `main.js` uses an anonymous IIFE: `(function() { 'use strict'; ... })();`
- [ ] `'use strict'` is the first statement inside both IIFEs
- [ ] No global variables created outside the IIFE (check for bare `var x = ...` at file top level outside the IIFE)

### DOM Guard Pattern (High Priority if missing)
- [ ] Every `document.getElementById()` or `document.querySelector()` result is checked before use
  - Pattern: `var el = document.getElementById('x'); if (el) { ... }`
  - A missing guard means the page will throw a TypeError on pages that don't have that element
- [ ] `querySelectorAll()` results can be safely iterated without a guard (returns empty NodeList), but check that `.forEach` is used, not direct indexing

### Event Listeners
- [ ] Scroll listeners use `{ passive: true }` option
- [ ] Resize listeners do not access DOM inside tight loops
- [ ] Event listeners on dynamic elements use delegation or are attached after render

### Path Handling
- [ ] No hardcoded relative paths in JS (e.g., `'../images/foo.jpg'` in JS) — must use `window.IMAGE_BASE + 'images/foo.jpg'`
- [ ] No hardcoded page links in JS — must use `window.PAGE_BASE + 'gallery.html'`

### Code Quality
- [ ] No magic numbers — numbers with no obvious meaning should have a named variable or comment
- [ ] No duplicate code blocks that could be extracted into a shared helper
- [ ] Functions are single-purpose (one function does one thing)
- [ ] All `KaysData` method calls check that the return value exists before using it (e.g., `var art = KaysData.getArtwork(id); if (!art) { ... }`)

### No-Feature Rules (High Priority if present)
- [ ] No price display, no currency symbols, no "buy" / "add to cart" / "checkout" language
- [ ] No backend API calls (no `fetch`, `XMLHttpRequest`, or `$.ajax`)
- [ ] No localStorage or sessionStorage reads/writes (this is a static informational site)
- [ ] No npm imports or `require()` calls

---

## CSS Checklist

### Animation Rules (High Priority if violated)
- [ ] Only `transform` and `opacity` properties have `transition` declarations
- [ ] No `transition: all` anywhere — this is an explicit project rule
- [ ] No `animation` on layout properties (`width`, `height`, `margin`, `padding`, `top`, `left`)

### Color Rules (Medium Priority if violated)
- [ ] No hardcoded hex colors — must use CSS custom properties from the `:root` block
  - Allowed: `var(--charcoal)`, `var(--blue)`, `var(--coral)`, `var(--teal)`, `var(--gold)`, `var(--gold-muted)`, `var(--off-white)`, `var(--light-gray)`, `var(--mid-gray)`, `var(--text-secondary)`, `var(--white)`
  - Any hex code like `#1e1e1e` used directly (not in `:root`) is a violation
- [ ] Brand colors are not approximated (e.g., `#1e1f1e` instead of `#1e1e1e`)

### Framework Rules (High Priority if present)
- [ ] No Tailwind utility classes (`flex`, `text-sm`, `bg-blue-500`, etc. as class names)
- [ ] No Bootstrap classes (`container`, `row`, `col-`, `btn-primary`, etc.)
- [ ] All class names follow the project's BEM-style naming (`.artwork-card`, `.card-frame`, `.nav-link`, etc.)

### Responsive Rules
- [ ] Breakpoints use the correct values: tablet at `max-width: 1023px`, mobile at `max-width: 640px`
- [ ] No new breakpoint values introduced without a clear reason
- [ ] Mobile styles use `max-width` (desktop-first approach matches the existing codebase)

### Typography Rules
- [ ] Headings use `var(--font-heading)` — `'DM Serif Display', Georgia, serif`
- [ ] Body text uses `var(--font-body)` — `'Outfit', system-ui, sans-serif`
- [ ] No hardcoded `font-family` strings that bypass these variables

---

## HTML Checklist (if analyzing HTML files)

### Structure
- [ ] `<body>` has `data-page="[page-name]"` attribute (used by JS for nav active state)
- [ ] Page has a skip link: `<a href="#main-content" class="skip-link">Skip to main content</a>`
- [ ] `<main id="main-content">` exists on every page
- [ ] Each page loads `js/data.js` before `js/main.js`
- [ ] `window.PAGE_BASE` and `window.IMAGE_BASE` are set in a `<script>` block before the JS files

### Accessibility
- [ ] Interactive elements have `aria-label` or visible text labels
- [ ] Accordion buttons have `aria-expanded` attribute
- [ ] Images have meaningful `alt` text (not empty unless decorative)
- [ ] Color is not the only way information is conveyed

### Linking Convention
- [ ] `index.html` links to pages as `pages/X.html`
- [ ] Pages in `pages/` link to each other as `X.html` (same directory, no prefix)
- [ ] Pages in `pages/` link to homepage as `../index.html`
- [ ] Assets in `pages/` use `../css/`, `../js/`, `../images/` prefixes

---

## Severity Definitions

| Priority | Meaning |
|----------|---------|
| **High** | Will cause a runtime error, breaks a feature, or violates a hard project rule |
| **Medium** | Degrades quality, maintainability, or consistency but doesn't break anything |
| **Low / Style** | Minor improvement — naming, comments, minor cleanup |

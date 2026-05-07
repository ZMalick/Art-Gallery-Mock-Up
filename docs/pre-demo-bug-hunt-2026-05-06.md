# Pre-Demo Bug Hunt — 2026-05-06

## Summary
- **1 CRITICAL / 2 HIGH / 2 MEDIUM / 2 LOW**
- Top 3 demo-killers in priority order:
  1. [CRITICAL] Decade filter shows "1490s" and "1510s" in dropdown but selecting either returns zero results (empty state shown) — teacher will likely click every filter
  2. [HIGH] "Clear filters" link on the empty gallery state does nothing — `href="#"` with no event handler
  3. [HIGH] Horizontal overflow at 320px viewport from off-canvas nav drawer extending `scrollWidth` to 605px — a narrow phone or "responsive" demo will show a scrollbar

---

## Findings

### [CRITICAL] Decade filter "1490s" / "1510s" returns zero results — empty state shown to user

- **Location:** `js/main.js:271–273`
- **Hypothesis tested:** `renderGallery()` decade filter uses `Math.floor(a.year / 10) * 10 === parseInt(decade, 10)`. Artworks with `year: 'c. 1490'` or `year: 'c. 1510'` (both da Vinci pieces) will fail numeric coercion — `'c. 1490' / 10` produces `NaN`, so the comparison is always `false`.
- **Reproduction:**
  1. Go to `pages/gallery.html`
  2. Open "All Decades" dropdown — options include "1490s" and "1510s"
  3. Select "1490s" — grid shows 0 pieces, "No artwork matches your current filters" message appears
  4. Same result for "1510s"
- **Evidence (live test confirmed):**
  ```js
  // main.js:271
  return a.year && Math.floor(a.year / 10) * 10 === parseInt(decade, 10);
  // 'c. 1490' / 10 = NaN; Math.floor(NaN) * 10 = NaN; NaN === 1490 = false
  ```
  Playwright result: `{ gridItems: 0, emptyVisible: 'block' }` when "1490s" selected.
- **Affected artworks:** `vitruvian-man` (`year: 'c. 1490'`, decade `1490s`) and `anatomy-studies` (`year: 'c. 1510'`, decade `1510s`) — both da Vinci pieces.
- **Suggested fix:** In `renderGallery()`, parse `a.year` with `parseInt(a.year, 10)` (which correctly returns `1490` from `'c. 1490'`) before the floor comparison:
  ```js
  return parseInt(a.year, 10) && Math.floor(parseInt(a.year, 10) / 10) * 10 === parseInt(decade, 10);
  ```

---

### [HIGH] "Clear filters" link on empty gallery state has no event handler — clicking it does nothing

- **Location:** `pages/gallery.html:74`, `js/main.js` (absent)
- **Hypothesis tested:** When gallery filters return 0 results, `galleryEmpty` div displays with a "Clear filters" link (`id="clearFilters"`). This link should reset all filters and re-render the gallery. There is zero mention of `clearFilters` anywhere in `main.js`.
- **Reproduction:**
  1. Go to `pages/gallery.html`
  2. Select artist "Maya Torres" from the artist dropdown
  3. Click "Sketches" pill (Torres has no sketches) — empty state appears
  4. Click "Clear filters" — page scrolls to top (`href="#"` behavior), filters remain, grid stays empty
- **Evidence:**
  ```js
  // grep: "clearFilters" in main.js — NO MATCHES
  // gallery.html:74
  <a href="#" id="clearFilters">Clear filters</a>
  ```
  Playwright: `{ href: '#', exists: true }` — no click listener wired.
- **Suggested fix:** Add to `main.js` inside the `galleryGrid` block, after filter listeners are registered:
  ```js
  var clearFiltersLink = document.getElementById('clearFilters');
  if (clearFiltersLink) {
    clearFiltersLink.addEventListener('click', function(e) {
      e.preventDefault();
      currentCategory = '';
      pills.forEach(function(p) { p.classList.toggle('active', (p.dataset.category || '') === ''); });
      if (galleryArtistFilter) galleryArtistFilter.value = '';
      if (galleryDecadeFilter) galleryDecadeFilter.value = '';
      renderGallery();
    });
  }
  ```

---

### [HIGH] 320px viewport: horizontal overflow (scrollWidth 605px) — scrollbar visible in browser

- **Location:** `css/styles.css:57` (`body { overflow-x: hidden }`), `css/styles.css:3153–3165` (`.nav-links` off-canvas drawer)
- **Hypothesis tested:** The mobile off-canvas `.nav-links` drawer uses `transform: translateX(100%)` which physically extends `scrollWidth` to 605px at 320px. The `body { overflow-x: hidden }` clips visible overflow, but `html { overflow-x: visible }` (the default) still allows the browser to show a scrollbar in some environments.
- **Reproduction:**
  1. Open `pages/gallery.html` in DevTools at 320px width
  2. Observe vertical scrollbar on the right edge of the viewport
  3. On iOS Safari (or any browser that calculates scroll width from `html`), horizontal scrolling may be possible
- **Evidence (Playwright live test):**
  ```js
  { bodyScrollWidth: 605, viewportWidth: 320, hasHorizontalScroll: true }
  // Offender: NAV#mainNav, scrollWidth: 605
  ```
  Screenshot saved to `gallery-320px.png` — scrollbar visible on right edge.
- **Suggested fix:** Add `overflow-x: hidden` to the `html` element (not just `body`) in `css/styles.css`:
  ```css
  html { overflow-x: hidden; }
  ```
  This is the standard fix for the `position: fixed` off-canvas drawer extending `scrollWidth`.

---

### [MEDIUM] Dead `#lightbox` div in `artwork.html` — orphaned HTML element, unbound close button

- **Location:** `pages/artwork.html:75–79`, `js/main.js:479–507`
- **Hypothesis tested:** `artwork.html` includes a static `<div id="lightbox" class="lightbox">` with a `<button id="lightboxClose">` that was intended for the lightbox. However, `main.js` never references `#lightbox` or `#lightboxClose` — it creates a fresh `<div class="lightbox active">` dynamically on each click and removes it on close.
- **Reproduction:**
  1. Visit `pages/artwork.html?id=starry-night`
  2. Click the artwork image — lightbox opens (the JS-created one)
  3. Inspect DOM: `document.querySelectorAll('.lightbox')` returns 2 elements — the static `#lightbox` (hidden via CSS, no close handler) and the JS-created active one
- **Evidence (Playwright):**
  ```js
  { lightboxCount: 2, staticLightboxHidden: '', dynamicLightboxClass2: 'lightbox active' }
  ```
  The static `#lightbox` is not `display:none` via inline style — only CSS `.lightbox { display:none }` hides it. The `#lightboxClose` button has no event listener.
- **Impact:** No user-visible crash (the CSS hides the static lightbox), but `#lightboxClose` is a focusable button that keyboard users can Tab to — pressing Space/Enter would do nothing. A11y issue for a keyboard navigation demo.
- **Suggested fix:** Remove the static `<div id="lightbox">` block from `artwork.html` entirely, since `main.js` builds the lightbox dynamically and never uses it.

---

### [MEDIUM] Nav dropdown missing "All Artwork" shortcut — inconsistent with CLAUDE.md spec

- **Location:** All `pages/*.html` nav (12 pages), `index.html`
- **Hypothesis tested:** CLAUDE.md specifies the "Artwork" nav dropdown should have filter shortcuts for "All / Paintings / Sculptures / Sketches". The actual dropdown in every page has only Paintings / Sculptures / Sketches — no "All Artwork" child link.
- **Reproduction:**
  1. On any page, hover/click the "Artwork" dropdown
  2. See only 3 options: Paintings, Sculptures, Sketches
- **Evidence:** Every nav in `pages/*.html` and `index.html` has:
  ```html
  <ul class="dropdown" role="menu">
    <li><a href="gallery.html?category=painting" class="nav-link">Paintings</a></li>
    <li><a href="gallery.html?category=sculpture" class="nav-link">Sculptures</a></li>
    <li><a href="gallery.html?category=sketch" class="nav-link">Sketches</a></li>
  </ul>
  ```
  No "All" entry. Clicking "Artwork" (the toggle) does navigate to `gallery.html` with no category (all artwork), so the user can still access all artwork, but the dropdown itself shows no "All" option.
- **Suggested fix:** Add an "All Artwork" link as the first child in every dropdown:
  ```html
  <li><a href="gallery.html" class="nav-link">All Artwork</a></li>
  ```
  This requires updating 13 files (all pages + index.html).

---

### [LOW] `reclaimed-tower` missing large image variant — lightbox shows same resolution as card

- **Location:** `js/data.js:315`, `images/` directory
- **Hypothesis tested:** `reclaimed-tower` uses `imageLg: 'images/reclaimed-tower.jpg'` (same as `image`). All other contemporary artworks have a separate `-lg.jpg` file. The glob `images/reclaimed-tower-lg.jpg` returns no results.
- **Evidence:**
  ```js
  // data.js:315
  imageLg: 'images/reclaimed-tower.jpg',  // no -lg variant exists
  ```
  `images/reclaimed-tower-lg.jpg` — file does not exist.
- **Impact:** Lightbox opens with the same resolution image as the card thumbnail — lower quality than expected, but no broken image / 404.
- **Suggested fix:** Either create a higher-resolution version of `reclaimed-tower.jpg` named `reclaimed-tower-lg.jpg`, or accept the current behavior (same image is a valid fallback).

---

### [LOW] `data-page="artists"` on `artist.html` body — nav highlights "Artists" instead of the Artwork toggle

- **Location:** `pages/artist.html:18`
- **Hypothesis tested:** `artist.html` sets `data-page="artists"` which maps to target `'artists.html'` in `main.js:26`. The "Artists" nav link gets `.active` + `aria-current="page"`. This is correct behavior for an artist profile page. Not a crash. Noted for completeness.
- **Impact:** None — correct and intentional. Disproven.

---

## Disproven hypotheses

- **XSS via `?id=<script>` param:** URL-decoded value is passed to `KaysData.getArtist()` which does a simple string equality check against known IDs. No matching artist → "Artist Not Found" fallback rendered. No script injection.
- **`?id=` (empty string) crash on artwork/artist/exhibition detail:** Empty string is falsy; the conditional `artId ? KaysData.getArtwork(artId) : null` skips the lookup. All three detail pages show a clean "not found" state.
- **Path traversal `?id=../../etc/passwd`:** Same lookup — no match, graceful fallback rendered.
- **Mobile menu stuck open after resize to desktop:** `window.addEventListener('resize', ...)` in `main.js:944–955` properly closes the nav, resets aria-expanded, removes backdrop, and clears `body.style.overflow` when viewport crosses 1024px.
- **Contact form empty submit leaks JS error:** HTML5 `required` validation fires before JS submit handler — form is not submitted, no error div shown, no JS exception thrown.
- **EmailJS public key missing or placeholder:** Key `Qb8SA6Hjmj0s-rPZK` is present and initialized in `contact.html:217`. Service/template IDs hardcoded in `main.js:799–801`. The form will attempt real sends (not silently fail due to config).
- **`nonexistent` artist/artwork/exhibition ID:** All three detail pages show graceful "not found" markup.
- **Rapid filter pill clicks — race condition:** Pill click is synchronous, `renderGallery()` is synchronous DOM manipulation, no async operations or timers involved. No race condition possible.
- **Gallery modal crash when artwork has no dimensions:** All 21 artworks in `data.js` have `dimensions` defined. `modalSpecs.innerHTML` concatenation produces no `undefined` text.
- **`renderArtistAvatar` crash on null/empty artist name:** All 10 artists have valid non-empty `name` strings. The `artist.name.split(' ')` call is safe from actual data.
- **`artist-signup.html` page errors:** Page loads cleanly, no console errors.
- **404 page accessibility/navigation:** `pages/404.html` exists, renders with full nav + footer + working back links. The 404 is navigable but requires direct URL (no server-side 404 routing on a static site — teacher would need to type a bad URL to see it).

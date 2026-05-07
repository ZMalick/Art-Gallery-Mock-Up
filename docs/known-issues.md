# Known Issues

Punch list of outstanding bugs and inconsistencies on the live site. Maintained as items are discovered or resolved. Read this file before fixing visible bugs — items already triaged with severity + suggested fix.

**Last updated:** 2026-05-06

---

## HIGH severity

_(none active)_

---

## MEDIUM severity

_(none active)_

---

## LOW severity

_(none active)_

---

## Resolution log

| Date | Issue | Resolution |
|------|-------|------------|
| 2026-05-06 | Documentation drift (README, CLAUDE.md, status.md) | Updated to reflect 14-page site + current state + retired pricing rule |
| 2026-05-06 | "No prices" rule contradiction | Rule retired (Kay approved prices on contemporary work 2026-05-06) |
| 2026-05-06 | 9 Permanent Collection images broken | Wikipedia hotlinks were 403'd by the CDN at runtime. Downloaded each piece (1280px thumb) into `images/` and updated both `image` + `imageLg` paths in `js/data.js` to local files. Verified at 1440x900 across Gallery, Exhibitions, and Artwork Detail. |
| 2026-05-06 | Inconsistent nav on `artist-login.html` | File does not exist in the repo (never tracked in git). The standard nav already appears on all 12 `pages/*.html` files. Issue closed as stale. |
| 2026-05-06 | Two different footer designs | Adopted the 3-column ("Explore \| Company \| Get in Touch") pattern as the standard. Applied it to the 10 pages that had the 2-column version: `index.html` and `pages/{about, artist, artists, artwork, consignment, contact, exhibitions, faq, gallery}.html`. All 13 pages now share the same footer markup. |
| 2026-05-06 | Design audit cleanup pass | (a) Replaced 6 dead `var(--bg-alt, #...)`, `var(--ink-soft, #...)`, `var(--teal, #...)` fallbacks in `css/styles.css:1478–1629` with palette vars (`--off-white`, `--text-secondary`, `--teal`). (b) Refactored two layout-animating transitions to transform/opacity equivalents: dropdown link slide (`padding-left` → `transform: translateX`) and slideshow dot active state (removed `width`/`border-radius` from transition list). (c) Extracted ~14 inline `style=""` attributes from `artist-signup.html`, `consignment.html`, `exhibition.html`, `artwork.html` into named utility classes (`.tight-list`, `.helper-text`, `.email-link`, `.cta-helper`, `.consignment-contact-grid`, `.subsection-heading`, `.back-link-row`, `.cta-row-padded`) added near the end of `css/styles.css`. Remaining inline styles are all `style="display:none"` on JS-toggled elements (allowed). |
| 2026-05-06 | Pre-submission responsive + a11y verification | Sampled 13 pages at 1440x900, 1023x900, and 640x900. No visible horizontal overflow (the off-canvas drawer's `transform: translateX(100%)` extends `scrollWidth` but `body { overflow-x: hidden }` already clips it). Hamburger transitions correctly at the 1023 boundary. A11y: every page has 1 `<h1>`, `lang="en"`, a skip link to `#main-content`, a `<main>` landmark, a unique `<title>`, and full alt-text coverage on all static and JS-rendered images. Contact form inputs all have associated labels (the 2 unlabeled inputs are hidden audience markers). Detail page heading hierarchy skips `h1→h3` in some subsections — known but acceptable for WCAG AA. |
| 2026-05-06 | Critique-driven a11y polish + visit bridge | (a) `js/main.js` now sets `aria-current="page"` on the active top-level nav link and the Artwork dropdown toggle when on a gallery/artwork page (mirrors the existing `.active` class logic). (b) Contact form `.form-success` divs now have `role="status" aria-live="polite"` and `.form-error` divs have `role="alert" aria-live="assertive"` so screen readers announce submit results. (c) Every artwork detail page now renders a `.detail-visit` card (light-gray background, gold left border) with hours, address with Maps link, and a "Plan a Visit" CTA. Lede swaps based on `artwork.inPermanentCollection` ("Currently on view at the gallery." vs "On display at the gallery as part of the Permanent Collection."). |
| 2026-05-06 | `/normalize` — nav slogans | Standardized the per-page `nav-slogan` to the evocative/curatorial pattern. Changed: about → "Our Story", artist → "Meet the Artist", artwork → "A Closer Look", exhibitions → "Current & Upcoming", exhibition → "Now Showing", artist-signup → "Join the Gallery", faq → "Common Questions". Kept: "Discover Original Art" (home), "Browse Artwork" (gallery), "Meet the Artists" (artists listing), "For Artists" (consignment), "Come and Visit" (contact), "Page Not Found" (404 — functional state). |
| 2026-05-06 | `/polish` — final detail pass | (a) Removed the redundant "View This Piece" button on the home featured-artwork card. The image remains the primary clickable region; the title is now also a link (teal on hover), so total click-targets are preserved without duplicate CTAs. (b) Replaced the random/abstract Unsplash "portraits" of all 10 artists with stylized monogram avatars — DM Serif Display initials in a colored circle, one accent color per artist (coral, teal, blue, gold-muted, charcoal-light, blue-dark, charcoal). Renderer added at `renderArtistAvatar(artist, photoClass)` in `js/main.js`; CSS for `.artist-monogram` plus per-artist `[data-monogram-id="..."]` accents added to `css/styles.css`. (c) Monogram markup splits initials into `.mono-1` and `.mono-2` spans. Small avatars (`.artist-photo`, 64px on artists listing) hide `.mono-2` so only the first letter shows — much more legible at small sizes than two cramped letters. Large avatars (`.profile-photo`, 120px on artist detail) show both letters with a small `margin-right` for breathing room. |
| 2026-05-06 | Pre-demo image hotlink cleanup | Three permanent collection pieces (`self-portrait-thorn`, `les-demoiselles`, `the-two-fridas`) still hotlinked `upload.wikimedia.org` URLs; eight contemporary artworks hotlinked `images.unsplash.com`. All 11 downloaded locally into `images/` (Wikipedia via Wikimedia-compliant UA; Unsplash via standard curl). Both `image` and `imageLg` fields updated to local paths in `js/data.js`. `window.IMAGE_BASE = '../';` was also missing on 6 pages (`contact.html`, `404.html`, `about.html`, `consignment.html`, `artist-signup.html`, `faq.html`) — added on each. Site now has zero external image hotlinks. |
| 2026-05-06 | Pre-demo bug fixes (6 items) | (1) CRITICAL: Decade filter NaN bug — `renderGallery()` was computing `Math.floor(a.year / 10) * 10` on string years like `'c. 1490'` producing NaN. Fixed by comparing `a.decade === filterDecade` directly (both are already the `'1490s'` string from `js/data.js`). Also fixed decade dropdown label double-s bug: `getDecades()` returns values already ending in `'s'` (e.g. `'1490s'`), but main.js was appending another `'s'` — removed the append. (2) HIGH: "Clear filters" link had no event handler — wired click listener in `main.js` that resets category, artist filter, decade filter, re-activates "All" pill, and calls `renderGallery()`. (3) HIGH: Horizontal scroll at 320px — added `overflow-x: hidden` to the `html` rule in `css/styles.css` (body already had it; html did not). (4) MEDIUM: Dead `#lightbox` static div in `pages/artwork.html` — removed entirely; JS builds the lightbox dynamically and never uses the static one. (5) MEDIUM: Nav dropdown missing "All Artwork" — prepended `<li><a href="gallery.html" class="nav-link">All Artwork</a></li>` to the Artwork dropdown in all 13 files (index.html uses `pages/gallery.html`, pages/ use `gallery.html`). (6) LOW: `reclaimed-tower` missing `imageLg` — existing `reclaimed-tower.jpg` is already 4MB (high-res); copied it to `reclaimed-tower-lg.jpg` and updated `imageLg` in `js/data.js`. All 6 fixes verified via Playwright. |

---

_When you resolve an issue: move it from the active section to the Resolution log. When you discover a new issue: add it under the appropriate severity heading._

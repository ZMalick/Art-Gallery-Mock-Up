# Lessons Learned — Kay's Originals Website

Discovered patterns, resolved gotchas, and codebase-specific solutions.
Add an entry here whenever you solve a non-obvious problem or the user corrects a repeated mistake.

---

## 2026-03-16 — Local image paths across root vs. pages/

**Problem:** `js/data.js` is loaded by both `index.html` (project root) and all `pages/*.html` files. If an artwork's `image` field stores a local path like `images/foo.jpg`, it resolves correctly from the root but breaks from `pages/` (which needs `../images/foo.jpg`).

**Solution:** Two-part fix already implemented:

1. **`window.IMAGE_BASE`** — set on each HTML page before the script tags:
   - `index.html`: `window.IMAGE_BASE = '';`
   - `pages/*.html`: `window.IMAGE_BASE = '../';`

2. **`resolveImageSrc(src)`** helper in `js/main.js`:
   ```js
   function resolveImageSrc(src) {
     return src && src.startsWith('http') ? src : (window.IMAGE_BASE || '') + src;
   }
   ```
   Use this everywhere an `art.image` or `artwork.imageLg` is set as an `<img src>`. External Unsplash/CDN URLs (starting with `https://`) pass through unchanged.

**Affected files:** `js/main.js` (3 img src spots ~lines 49, 309, 343), all HTML pages (PAGE_BASE script tag), `js/data.js` (image field values).

---

## 2026-05-06 — Decade filter: use the `decade` field directly, not computed from `year`

**Problem:** `renderGallery()` was computing decade with `Math.floor(a.year / 10) * 10`, but `a.year` can be a string like `'c. 1490'` — string / 10 produces NaN, so the filter always returned zero results for those artworks. The bug report suggested a `parseInt(String(a.year).match(/\d+/)[0], 10)` extraction fix, but there was a simpler solution.

**Solution:** `js/data.js` already stores a `decade` field on every artwork (e.g. `decade: '1490s'`), and `KaysData.getDecades()` reads from that field directly. The filter comparison becomes a simple string equality: `a.decade === filterDecade`. No arithmetic needed, no coercion issue.

**Bonus bug found during fix:** The decade dropdown label was appending `'s'` to the value returned by `getDecades()` (e.g. `'1490s' + 's'` → `'1490ss'`). Since the `decade` field already includes the `'s'` suffix, the append must be removed. Always check the shape of the data source before formatting display labels.

---

## 2026-03-16 — window.PAGE_BASE convention for dynamic links

**Problem:** JS-generated links (e.g., `artist.html?id=...`) in `js/main.js` need to work from both root and `pages/`.

**Solution:** `window.PAGE_BASE` — set before the script tags on each page:
- `index.html`: `window.PAGE_BASE = 'pages/';`
- `pages/*.html`: `window.PAGE_BASE = '';`

Used in main.js as `(window.PAGE_BASE || '') + 'artist.html?id=' + id`.

**Note:** IMAGE_BASE and PAGE_BASE are separate variables — do not conflate them.

---

## 2026-03-16 — Avoid redundant exploration and token waste

**Problem:** Repeating the same codebase searches across sessions (re-reading files already understood, re-exploring patterns already solved) wastes tokens and slows down work.

**Solution:**
- Read this file (`reports/lessons-learned.md`) first — if a pattern or solution is already here, don't re-explore it
- Trust prior knowledge of file structure and conventions documented in CLAUDE.md rather than re-confirming them every session
- For small targeted changes (e.g., swapping a value in data.js), read only the specific lines needed — don't explore the whole file
- Only launch Explore agents when the scope is genuinely uncertain

**User feedback:** "You are repeating tasks a lot and wasting tokens." (2026-03-16)

---

## 2026-03-16 — Corrupt placeholder image for Reclaimed Tower

**Problem:** `images/reclaimed-tower.jpg` was a corrupt 1991-byte stub (not a real JPEG). The artwork showed no image. Attempting to read the file via Claude's Read tool caused an API error: "Could not process image". Also, `wiki_sculpt01.jpg` in the root was the same corrupt 1991-byte file.

**Solution:** Copied `wiki_sculpt10.jpg` (a valid 4MB JPEG from the root) over `images/reclaimed-tower.jpg`. No changes to `data.js` were needed — the path `images/reclaimed-tower.jpg` was already correct and works with the `resolveImageSrc` + `IMAGE_BASE` system.

**Caution:** Never use Claude's Read tool on image files in this repo — corrupt/non-standard files will cause API errors that blow up the terminal. Use `wc -c` (file size check) to verify image validity before attempting to read.

**Affected files:** `images/reclaimed-tower.jpg` (replaced).

---

## 2026-05-06 — Permanent Collection images broken on live site (RESOLVED)

**Problem:** During pre-submission walkthrough (Wed 5/6), 9 Permanent Collection artworks showed alt text instead of images on the Gallery page and other pages where they appear: Sunflowers, The Starry Night, Water Lilies, Guernica, The Kiss, The Thinker, Vitruvian Man, Anatomy Studies, Impression Sunrise.

**Actual cause:** Not missing local files. The 9 broken entries hotlinked Wikimedia Commons **`/thumb/`** URLs (e.g. `…/thumb/<hash>/<file>/600px-<file>.jpg`). Wikimedia returns an HTML error page for thumbnail requests that arrive without a Wikimedia-compliant `User-Agent`, and at least some `<img>` loads from the static site fell into that bucket. The 3 Kahlo/Picasso pieces that kept working pointed at non-thumb `/wikipedia/en/<hash>/<file>.jpg` URLs and were unaffected.

**Fix applied:**
1. Downloaded the 1280px JPEG of each piece from Wikimedia Commons into `images/<slug>.jpg` using `curl` with a Wikimedia-compliant UA (`KaysOriginalsWebsite/1.0 (https://github.com/ZM299; zaidmalick6@gmail.com)`). The default browser UA strings are rejected with an HTML error body — first run produced 1991-byte HTML "files."
2. Updated both `image` and `imageLg` for each of the 9 pieces in `js/data.js` to point at the local path (e.g. `images/starry-night.jpg`). One file per piece is fine — the small thumbnail size is just a CSS-scaled render of the same JPEG.
3. Verified in Playwright (Chromium) at 1440x900 across `pages/gallery.html`, `pages/exhibitions.html`, and `pages/artwork.html?id=<slug>` — all 9 `<img>` elements now have `naturalWidth > 0`.

**Lessons:**
- `wc -c` size sniffing only catches local files. For external CDN failures, hit the URL with `curl -I` (or load it in a browser) and read the response body — Wikimedia in particular signals hotlink failures with an HTML error page rather than a non-200 status.
- Default browser UA strings (e.g. `Mozilla/5.0 ... Chrome/120.0`) are rejected by Wikimedia for automated downloads. Use a UA that names the project + a contact URL or email.
- Wikimedia `/wikipedia/en/...` paths are more permissive than `/commons/thumb/...` paths. Both work in `<img>` tags inconsistently — always download a local copy for any production use.

**Affected files:** `js/data.js`, `images/{starry-night,water-lilies,the-thinker,vitruvian-man,guernica,impression-sunrise,the-kiss-rodin,anatomy-studies,sunflowers}.jpg`.

**Caution still applies:** Never use Claude's Read tool on suspect image files — corrupt files crash the API. Use `wc -c` to verify size first.

---

## 2026-05-06 — Off-canvas drawer + scrollWidth false-positive

**Problem:** When auditing responsive layout at 640px, a custom check using `document.documentElement.scrollWidth` flagged 285px of horizontal overflow on the homepage. Initial reaction was that the layout was broken. It wasn't.

**Cause:** The mobile nav drawer (`.nav-links` at `max-width: 1023px`) is `position: fixed; right: 0; transform: translateX(100%);` — i.e. parked one full drawer-width off the right edge of the viewport. Modern browsers include transformed elements when computing `scrollWidth`, even when the element is not visually scrollable. So the metric reads 925px (640 viewport + 285 drawer) even though `body { overflow-x: hidden }` clips the visible area to 640.

**Lesson:** `scrollWidth > innerWidth` is **not** a reliable horizontal-overflow indicator on this codebase (or any site that uses an off-canvas drawer with transform translation). For real overflow detection, either:
- Walk visible elements with `getBoundingClientRect()` and filter out `position: fixed`/`position: absolute` elements that are off-screen, OR
- Just look at the rendered screenshot.

If the drawer's "ghost" overflow ever does become a problem (some screen-readers or older browsers might announce it), swap `body { overflow-x: hidden }` for `overflow-x: clip` (clip doesn't establish a scrolling context, so it doesn't break sticky positioning).

---

## 2026-05-06 — Wikimedia thumbnail hotlinking and User-Agent gating

**Problem:** When fixing the broken Permanent Collection images, a first-pass `curl` download with a "real-looking" Chrome UA (`Mozilla/5.0 ... Chrome/120.0`) returned **1991-byte HTML error pages** instead of JPEGs. Same UA in the Read tool would have crashed the Claude API (per the prior 2026-03-16 lesson on `images/reclaimed-tower.jpg`).

**Cause:** Wikimedia rejects automated requests with browser-impersonating UAs. They want a **descriptive UA** that names the project + a contact channel.

**Lesson:** Use this UA pattern for any Wikimedia download:
```
KaysOriginalsWebsite/1.0 (https://github.com/ZM299; zaidmalick6@gmail.com)
```
And: when an image download produces a tiny file, *don't* pass it to the Read tool. The 1991-byte payload is HTML — `head -c 500 file.jpg | od -c` will show `<!DOCTYPE html>` immediately. Same heuristic that was burned in last quarter still applies.

---

## 2026-05-06 — Footer markup unification

**Problem:** 3 pages (`404.html`, `artist-signup.html`, `exhibition.html`) used a 3-column footer ("Explore | Company | Get in Touch"); the other 10 (`index.html` + 9 in `pages/`) used a 2-column footer with only brand + contact. Result: visible inconsistency between sub-pages.

**Solution:** Adopted the 3-column markup as the standard. Inserted two `<div class="footer-links">` blocks (Explore, Company) between `.footer-brand` and `.footer-contact` on the 10 affected pages. Path conventions:
- `pages/*.html` → bare links (`gallery.html`, `about.html`, etc.) since `PAGE_BASE = ''`
- `index.html` → `pages/`-prefixed links since `PAGE_BASE = 'pages/'`

**Visual layout:** Despite the "3-column" name, `.footer-inner` in `css/styles.css` uses `grid-template-columns: 1.3fr 1.2fr` (2 columns), so 4 children wrap into a 2x2 grid. This is intentional — the existing 3-col pages render the same way. If a true 4-across layout is wanted later, change the grid to `repeat(4, 1fr)` (or similar) and add a wider `max-width`.

**Affected files:** `index.html` and `pages/{about, artist, artists, artwork, consignment, contact, exhibitions, faq, gallery}.html`.

---

## 2026-05-06 — IMAGE_BASE omission on static/informational pages

**Problem:** `window.IMAGE_BASE = '../';` was set on pages that render dynamic artwork cards (gallery, artists, artwork, exhibition) but was omitted on 6 pages with no artwork cards (`contact.html`, `404.html`, `about.html`, `consignment.html`, `artist-signup.html`, `faq.html`). If any of those pages ever receive a JS component that resolves `art.image` via `resolveImageSrc`, the path would silently fall back to a root-relative `images/` path (broken from `pages/`).

**Fix:** Added `<script>window.IMAGE_BASE = '../';</script>` immediately after the `PAGE_BASE` script tag on all 6 pages. It is harmless on pages that don't use it and prevents breakage if artwork components are ever added.

**Rule:** Every `pages/*.html` file must have both `window.PAGE_BASE = '';` and `window.IMAGE_BASE = '../';` before the data/main script tags — no exceptions.

---

_Add new entries above this line._

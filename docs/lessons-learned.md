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

_Add new entries above this line._

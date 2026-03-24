# Website Polish & Enhancement Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 30 improvements across bugs, UX, content, design, accessibility, SEO, and new features for the Kay's Originals website.

**Architecture:** File-by-file sweep — data layer first, then CSS, then HTML pages (global changes + page-specific), then JS logic, then new files. Each file is touched once to minimize context switching.

**Tech Stack:** Vanilla HTML, CSS (custom properties), JS (IIFE modules, ES5-compatible). No frameworks, no build tools.

**Spec:** `docs/superpowers/specs/2026-03-16-website-polish-design.md`

---

## File Structure

Files to modify (in order):
1. `js/data.js` — Add 4 fictional artists, ~9 new artworks, `getArtistList()` helper
2. `css/styles.css` — All new styles (skip link, lightbox, empty state, print, badges, overlays, dropdowns, form feedback, social icons, artist hero, dimension text)
3. `index.html` — Global HTML changes + homepage-specific fixes + social icons
4. `pages/gallery.html` — Global HTML changes + filter dropdowns + empty state markup
5. `pages/artwork.html` — Global HTML changes + lightbox trigger + "More by Artist" + "Back to Gallery" CTA
6. `pages/artist.html` — Global HTML changes + hero banner markup
7. `pages/artists.html` — Global HTML changes + empty state
8. `pages/about.html` — Global HTML changes + fix escaped quotes (if any)
9. `pages/consignment.html` — Global HTML changes + hero image
10. `pages/contact.html` — Global HTML changes + clickable contact + FAQ link + form validation markup
11. `pages/faq.html` — Global HTML changes + ARIA improvements
12. `js/main.js` — All JS logic (dynamic titles, active nav, filters, sort, lightbox, form validation, FAQ keyboard, mobile backdrop, JSON-LD, dynamic meta)
13. `pages/404.html` — New file
14. `images/favicon.png` — New file (base64 PNG)

---

## Chunk 1: Data Layer

### Task 1: Add New Artists to `js/data.js`

**Files:**
- Modify: `js/data.js:10-120` (artists array)

- [ ] **Step 1: Add 4 fictional artists after the existing 6**

Add these 4 artist objects after the existing `davinci` entry (around line 105), before the closing `];` of the artists array:

```javascript
    {
      id: 'torres',
      name: 'Maya Torres',
      media: 'Painting',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
      bio: 'Maya Torres is an Austin-based painter known for her vibrant abstract landscapes. Drawing inspiration from the Texas hill country and her Mexican-American heritage, her canvases burst with saturated color and bold, sweeping forms. Torres studied fine art at the University of Texas and has exhibited in galleries across the Southwest. Her work invites viewers to see familiar terrain through a lens of emotion and memory.',
      shortBio: 'Austin-based artist known for vibrant abstract landscapes'
    },
    {
      id: 'whitfield',
      name: 'James Whitfield',
      media: 'Sculpture',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'James Whitfield is a mixed-media sculptor who transforms found objects into striking assemblages that explore themes of memory and impermanence. Working from his Brooklyn studio, Whitfield salvages discarded materials — rusted metal, reclaimed wood, vintage hardware — and gives them new life as contemplative sculptural forms. His work has been featured in group shows across the East Coast and is held in several private collections.',
      shortBio: 'Mixed-media sculptor working with found-object assemblages'
    },
    {
      id: 'chen',
      name: 'Sofia Chen',
      media: 'Sketching',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
      bio: 'Sofia Chen is an architectural artist whose meticulous ink and charcoal studies capture the soul of urban spaces. Trained as an architect before turning to fine art full time, Chen brings technical precision and an eye for structural beauty to every piece. Her drawings range from intimate studies of doorways and staircases to sweeping panoramas of city skylines, all rendered with extraordinary detail and a quiet sense of atmosphere.',
      shortBio: 'Architectural ink and charcoal studies of urban spaces'
    },
    {
      id: 'grant',
      name: 'Elijah Grant',
      media: 'Painting & Sketching',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      bio: 'Elijah Grant is a figurative artist whose portraits and gesture sketches capture the energy and emotion of his subjects with remarkable immediacy. Based in Chicago, Grant works in both oil paint and charcoal, moving fluidly between the two media. His painted portraits are rich and luminous, while his charcoal sketches are loose and expressive, often completed in a single sitting. Grant draws from the traditions of classical portraiture while bringing a distinctly contemporary perspective.',
      shortBio: 'Figurative portraits and gesture sketches'
    }
```

- [ ] **Step 2: Verify artists array has 10 entries**

Count the objects in the `artists` array — should be 10 (6 existing + 4 new).

- [ ] **Step 3: Commit**

```bash
git add js/data.js
git commit -m "feat(data): add 4 fictional artists (Torres, Whitfield, Chen, Grant)"
```

---

### Task 2: Add New Artwork to `js/data.js`

**Files:**
- Modify: `js/data.js:122-260` (artworks array)

- [ ] **Step 1: Add 9 new artwork entries after the existing 12**

Add these artwork objects after the existing `les-demoiselles` entry, before the closing `];` of the artworks array. Distribution: 3 paintings, 2 sculptures, 2 sketches, 2 mixed:

```javascript
    {
      id: 'desert-bloom',
      title: 'Desert Bloom',
      artistId: 'torres',
      category: 'painting',
      year: '2024',
      medium: 'Acrylic on canvas',
      dimensions: '91.4 x 121.9 cm',
      description: 'A vivid abstract landscape inspired by the wildflower season in the Texas hill country. Layers of magenta, gold, and turquoise create a sense of depth and movement across the canvas.',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=900&fit=crop'
    },
    {
      id: 'amber-horizon',
      title: 'Amber Horizon',
      artistId: 'torres',
      category: 'painting',
      year: '2023',
      medium: 'Oil on canvas',
      dimensions: '76.2 x 101.6 cm',
      description: 'Warm amber and ochre tones stretch across a panoramic landscape, capturing the golden hour light of a Southwest sunset. Torres uses thick impasto strokes to build texture and luminosity.',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=900&fit=crop'
    },
    {
      id: 'reclaimed-tower',
      title: 'Reclaimed Tower',
      artistId: 'whitfield',
      category: 'sculpture',
      year: '2024',
      medium: 'Found metal, reclaimed wood, steel wire',
      dimensions: '48.3 x 22.9 x 22.9 cm',
      description: 'A vertical assemblage of salvaged industrial parts — gears, brackets, and weathered wood fragments — stacked into a precarious tower that speaks to resilience and reinvention.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=900&fit=crop'
    },
    {
      id: 'vessel-of-memory',
      title: 'Vessel of Memory',
      artistId: 'whitfield',
      category: 'sculpture',
      year: '2023',
      medium: 'Rusted steel, vintage glass, copper wire',
      dimensions: '35.6 x 30.5 x 30.5 cm',
      description: 'A hollow spherical form woven from rusted steel strips and fragments of vintage glass. Light passes through the openings, casting intricate shadow patterns that shift throughout the day.',
      image: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=1200&h=900&fit=crop'
    },
    {
      id: 'bridge-and-fog',
      title: 'Bridge and Fog',
      artistId: 'chen',
      category: 'sketch',
      year: '2024',
      medium: 'Ink on paper',
      dimensions: '45.7 x 61.0 cm',
      description: 'A detailed ink study of a suspension bridge emerging from morning fog. Chen captures the interplay of engineered precision and natural atmosphere with controlled, confident linework.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=900&fit=crop'
    },
    {
      id: 'stairwell-light',
      title: 'Stairwell Light',
      artistId: 'chen',
      category: 'sketch',
      year: '2023',
      medium: 'Charcoal on paper',
      dimensions: '50.8 x 40.6 cm',
      description: 'A charcoal rendering of a spiral staircase bathed in diffused light from a skylight above. The drawing balances architectural rigidity with soft tonal gradations that evoke quiet contemplation.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=900&fit=crop'
    },
    {
      id: 'portrait-in-gold',
      title: 'Portrait in Gold',
      artistId: 'grant',
      category: 'painting',
      year: '2024',
      medium: 'Oil on linen',
      dimensions: '61.0 x 45.7 cm',
      description: 'A luminous portrait rendered in warm golds and deep browns. The subject gazes directly at the viewer with quiet intensity, their features emerging from a loosely painted background of amber light.',
      image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1200&h=900&fit=crop'
    },
    {
      id: 'gesture-study-iv',
      title: 'Gesture Study IV',
      artistId: 'grant',
      category: 'sketch',
      year: '2024',
      medium: 'Charcoal on newsprint',
      dimensions: '45.7 x 61.0 cm',
      description: 'One of a series of rapid gesture drawings capturing a figure in motion. Bold, confident charcoal strokes define the essential movement and weight of the pose in just minutes.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=900&fit=crop'
    },
    {
      id: 'evening-figure',
      title: 'Evening Figure',
      artistId: 'grant',
      category: 'painting',
      year: '2023',
      medium: 'Oil on canvas',
      dimensions: '91.4 x 61.0 cm',
      description: 'A full-length figure stands silhouetted against a dusky evening sky. The painting balances realism in the figure with impressionistic handling of the background, creating a mood of solitude and reflection.',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=450&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=900&fit=crop'
    }
```

- [ ] **Step 2: Verify artworks array has 21 entries**

Count the objects in the `artworks` array — should be 21 (12 existing + 9 new).

- [ ] **Step 3: Commit**

```bash
git add js/data.js
git commit -m "feat(data): add 9 new artworks across 4 fictional artists"
```

---

### Task 3: Add `getArtistList()` Helper to `js/data.js`

**Files:**
- Modify: `js/data.js:265-280` (public API section)

- [ ] **Step 1: Add helper function before the return statement**

Add this function after the existing `searchArtworks` function (around line 265) and before the `return` block:

```javascript
  function getArtistList() {
    return artists
      .map(function(a) { return { id: a.id, name: a.name }; })
      .sort(function(a, b) { return a.name.localeCompare(b.name); });
  }
```

- [ ] **Step 2: Expose it in the return object**

Add `getArtistList: getArtistList` to the return object alongside the existing exports.

- [ ] **Step 3: Commit**

```bash
git add js/data.js
git commit -m "feat(data): add getArtistList() helper for dropdown filters"
```

---

## Chunk 2: CSS Styles

### Task 4: Add All New CSS Styles to `css/styles.css`

**Files:**
- Modify: `css/styles.css` (append new rules before the responsive media queries at line 1676)

- [ ] **Step 1: Add skip link styles**

Insert before the `@media (max-width: 1023px)` block (line 1676):

```css
/* ===== SKIP LINK ===== */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: 0.5rem 1rem;
  background: var(--charcoal);
  color: var(--white, #fff);
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 0.875rem;
  text-decoration: none;
}
.skip-link:focus {
  top: 0.5rem;
}
```

- [ ] **Step 2: Add mobile menu backdrop styles**

```css
/* ===== MOBILE MENU BACKDROP ===== */
.nav-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.5);
}
.nav-backdrop.active {
  display: block;
}
```

- [ ] **Step 3: Add lightbox overlay styles**

```css
/* ===== LIGHTBOX OVERLAY ===== */
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  align-items: center;
  justify-content: center;
}
.lightbox.active {
  display: flex;
}
.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}
.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.5rem;
}
.artwork-detail-image {
  cursor: zoom-in;
}
```

- [ ] **Step 4: Add empty state styles**

```css
/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--mid-gray);
  font-family: var(--font-body);
}
.empty-state p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.empty-state a {
  color: var(--blue);
  text-decoration: underline;
}
.empty-state a:hover {
  color: var(--blue-dark);
}
```

- [ ] **Step 5: Add "Recently Added" badge styles**

```css
/* ===== RECENTLY ADDED BADGE ===== */
.badge-new {
  display: inline-block;
  background: var(--gold);
  color: var(--charcoal);
  font-size: 0.7rem;
  font-family: var(--font-body);
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
```

- [ ] **Step 6: Add artist detail hero banner styles**

```css
/* ===== ARTIST DETAIL HERO BANNER ===== */
.artist-hero-banner {
  background: linear-gradient(135deg, var(--light-gray) 0%, var(--off-white) 100%);
  padding: 3rem 0;
}
```

- [ ] **Step 7: Add gallery dropdown styles**

```css
/* ===== GALLERY DROPDOWNS ===== */
.gallery-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.gallery-select {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--mid-gray);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  background: var(--off-white);
  color: var(--charcoal);
  cursor: pointer;
}
.gallery-select:focus {
  outline: 2px solid var(--blue);
  outline-offset: 1px;
}
```

- [ ] **Step 8: Add inline form feedback styles**

```css
/* ===== FORM FEEDBACK ===== */
.form-success {
  background: var(--teal);
  color: #fff;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  font-family: var(--font-body);
  margin-top: 1rem;
}
.form-error-msg {
  color: var(--coral);
  font-size: 0.8rem;
  font-family: var(--font-body);
  margin-top: 0.25rem;
}
.form-group.has-error input,
.form-group.has-error textarea,
.form-group.has-error select {
  border-color: var(--coral);
}
```

- [ ] **Step 9: Add dimension text on cards style**

```css
/* ===== CARD DIMENSIONS ===== */
.card-dimensions {
  font-size: 0.75rem;
  color: var(--mid-gray);
  font-family: var(--font-body);
}
```

- [ ] **Step 10: Add social icons footer styles**

```css
/* ===== SOCIAL ICONS ===== */
.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.footer-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--mid-gray);
  transition: color 0.2s ease;
}
.footer-social a:hover {
  color: var(--gold);
}
.footer-social svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

- [ ] **Step 11: Add active nav state style**

```css
/* ===== ACTIVE NAV STATE ===== */
.nav-link.active {
  color: var(--gold);
}
```

- [ ] **Step 12: Add print stylesheet**

```css
/* ===== PRINT ===== */
@media print {
  .site-nav, .main-nav, .site-footer, .hamburger, .skip-link,
  .nav-backdrop, .lightbox, .color-bar { display: none; }
  body { background: white; color: black; }
  a[href]::after { content: " (" attr(href) ")"; font-size: 0.8em; }
  img { max-width: 100%; page-break-inside: avoid; }
}
```

- [ ] **Step 13: Add responsive overrides for new styles in tablet and mobile media queries**

In the `@media (max-width: 1023px)` block, add:
```css
  .gallery-controls {
    flex-direction: column;
    align-items: stretch;
  }
```

In the `@media (max-width: 640px)` block, add:
```css
  .gallery-controls {
    gap: 0.5rem;
  }
```

- [ ] **Step 14: Commit**

```bash
git add css/styles.css
git commit -m "feat(css): add styles for skip link, lightbox, empty state, badges, dropdowns, form feedback, social icons, print, and more"
```

---

## Chunk 3: Homepage HTML

### Task 5: Apply Global Changes + Homepage Fixes to `index.html`

**Files:**
- Modify: `index.html`

The "global changes" applied here are the template for all pages: favicon, skip link, `<main>` landmark, meta description, OG tags, clickable footer contact, `data-page` on body.

- [ ] **Step 1: Add favicon and meta description in `<head>`**

After the `<link rel="stylesheet" href="css/styles.css">` line (line 12), add:

```html
  <link rel="icon" href="images/favicon.png" type="image/png">
  <meta name="description" content="Discover bold, original artwork from visionary artists at Kay's Originals gallery in Austin, TX.">
  <meta property="og:title" content="Kay's Originals — Original Art, Personally Curated">
  <meta property="og:description" content="Discover bold, original artwork from visionary artists at Kay's Originals gallery in Austin, TX.">
  <meta property="og:image" content="images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page` attribute to `<body>` and skip link**

Change `<body>` to `<body data-page="home">`.

Add skip link as first child of `<body>`:
```html
  <a href="#main-content" class="skip-link">Skip to main content</a>
```

- [ ] **Step 3: Wrap content in `<main>` landmark**

After the closing `</nav>` tag, add `<main id="main-content">`.
Before the `<footer>` tag, add `</main>`.

- [ ] **Step 4: Fix escaped quotes in blockquote**

Find the Kay Green blockquote (around line 127). If it contains `\"` escaped quotes, replace them with proper `"` and `"` smart quotes. The blockquote should read:

```html
      <blockquote class="founder-quote">
        <p>&ldquo;Every piece in our gallery tells a story. Our job is to help it find the right home.&rdquo;</p>
        <cite>— Kay Green, Founder</cite>
      </blockquote>
```

- [ ] **Step 5: Make footer contact info clickable and add social icons**

In the footer `footer-contact` div, replace the email and phone paragraphs:

```html
        <p><strong>Email</strong><br><a href="mailto:info@kaysoriginals.com">info@kaysoriginals.com</a></p>
        <p><strong>Phone</strong><br><a href="tel:+15550123456">(555) 012-3456</a></p>
        <p><strong>Location</strong><br>Austin, TX</p>
```

In the `footer-brand` div, after the tagline paragraph, add social media icons:

```html
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
        </div>
```

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat(homepage): add global HTML improvements (favicon, skip link, main landmark, meta/OG, clickable footer, social icons)"
```

---

## Chunk 4: Pages HTML (Global + Page-Specific Changes)

### Task 6: Update `pages/gallery.html`

**Files:**
- Modify: `pages/gallery.html`

- [ ] **Step 1: Add global `<head>` elements**

After the stylesheet link, add:
```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Browse our full collection of original paintings, sculptures, and sketches.">
  <meta property="og:title" content="Gallery — Kay's Originals">
  <meta property="og:description" content="Browse our full collection of original paintings, sculptures, and sketches.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page`, skip link, `<main>` landmark**

Change `<body>` to `<body data-page="gallery">`.
Add skip link as first child of body.
Wrap content between nav and footer in `<main id="main-content">...</main>`.

- [ ] **Step 3: Add artist dropdown and sort dropdown markup**

After the search input in the filter bar, add:
```html
          <select id="artistFilter" class="gallery-select" aria-label="Filter by artist">
            <option value="">All Artists</option>
          </select>
          <select id="sortSelect" class="gallery-select" aria-label="Sort artwork">
            <option value="default">Sort: Default</option>
            <option value="newest">Sort: Newest First</option>
            <option value="artist">Sort: Artist (A–Z)</option>
            <option value="title">Sort: Title (A–Z)</option>
          </select>
```

- [ ] **Step 4: Add empty state markup**

After the `#galleryGrid` div, add:
```html
        <div id="galleryEmpty" class="empty-state" style="display:none;">
          <p>No artwork matches your current filters.</p>
          <a href="#" id="clearFilters">Clear filters</a>
        </div>
```

- [ ] **Step 5: Make footer contact clickable**

Same pattern as homepage — wrap email in `mailto:` link, phone in `tel:` link.

- [ ] **Step 6: Commit**

```bash
git add pages/gallery.html
git commit -m "feat(gallery): add global HTML + artist/sort dropdowns + empty state"
```

---

### Task 7: Update `pages/artwork.html`

**Files:**
- Modify: `pages/artwork.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="View artwork details at Kay's Originals gallery.">
  <meta property="og:title" content="Artwork — Kay's Originals">
  <meta property="og:description" content="View artwork details at Kay's Originals gallery.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="gallery"`, skip link, `<main>` landmark**

- [ ] **Step 3: Add "More by Artist" section and "Back to Gallery" CTA markup**

After the `#artworkDetail` container div, add:
```html
        <section id="moreByArtist" class="more-by-artist" style="display:none;">
          <div class="section-inner">
            <h2 id="moreByArtistHeading"></h2>
            <div id="moreByArtistGrid" class="artwork-grid"></div>
          </div>
        </section>
        <div class="section-inner" style="padding-top:2rem;padding-bottom:2rem;text-align:center;">
          <a href="gallery.html" class="btn btn-secondary">Browse All Artwork</a>
        </div>
```

- [ ] **Step 4: Make footer contact clickable**

- [ ] **Step 5: Commit**

```bash
git add pages/artwork.html
git commit -m "feat(artwork): add global HTML + more-by-artist section + back-to-gallery CTA"
```

---

### Task 8: Update `pages/artist.html`

**Files:**
- Modify: `pages/artist.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Learn about this artist at Kay's Originals gallery.">
  <meta property="og:title" content="Artist — Kay's Originals">
  <meta property="og:description" content="Learn about this artist at Kay's Originals gallery.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="artists"`, skip link, `<main>` landmark**

- [ ] **Step 3: Make footer contact clickable**

- [ ] **Step 4: Commit**

```bash
git add pages/artist.html
git commit -m "feat(artist-detail): add global HTML improvements"
```

---

### Task 9: Update `pages/artists.html`

**Files:**
- Modify: `pages/artists.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Meet the talented artists represented by Kay's Originals gallery.">
  <meta property="og:title" content="Artists — Kay's Originals">
  <meta property="og:description" content="Meet the talented artists represented by Kay's Originals gallery.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="artists"`, skip link, `<main>` landmark**

- [ ] **Step 3: Add empty state markup after the artist grid**

```html
        <div id="artistsEmpty" class="empty-state" style="display:none;">
          <p>No artists match your search.</p>
          <a href="#" id="clearArtistSearch">Clear search</a>
        </div>
```

- [ ] **Step 4: Make footer contact clickable**

- [ ] **Step 5: Commit**

```bash
git add pages/artists.html
git commit -m "feat(artists): add global HTML + empty state markup"
```

---

### Task 10: Update `pages/about.html`

**Files:**
- Modify: `pages/about.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="The story behind Kay's Originals — a curated art gallery in Austin, TX.">
  <meta property="og:title" content="About — Kay's Originals">
  <meta property="og:description" content="The story behind Kay's Originals — a curated art gallery in Austin, TX.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="about"`, skip link, `<main>` landmark**

- [ ] **Step 3: Fix escaped quotes in blockquote if present**

The about.html blockquote at line 65 looks clean, but verify the rendered HTML. If `\"` appears, replace with `&ldquo;` / `&rdquo;`.

- [ ] **Step 4: Make footer contact clickable**

- [ ] **Step 5: Commit**

```bash
git add pages/about.html
git commit -m "feat(about): add global HTML improvements"
```

---

### Task 11: Update `pages/consignment.html`

**Files:**
- Modify: `pages/consignment.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Learn how to consign your artwork at Kay's Originals gallery.">
  <meta property="og:title" content="Consignment — Kay's Originals">
  <meta property="og:description" content="Learn how to consign your artwork at Kay's Originals gallery.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="consignment"`, skip link, `<main>` landmark**

- [ ] **Step 3: Add hero image to the consignment hero section**

Replace the `page-hero` section with one that includes an image:
```html
  <section class="page-hero consignment-hero-img">
    <div class="section-inner">
      <span class="page-label">For Artists</span>
      <h1>Consignment at Kay's Originals</h1>
      <p class="hero-subtitle">We partner with artists to share their work with a wider audience. Learn how to join our gallery.</p>
    </div>
  </section>
```

Add CSS for the hero image (in the same commit or rely on existing styles — the image will be set via a background-image or an `<img>` tag). Simpler approach — add an image element inside the hero:

Actually, to match the about page pattern, add an image above the steps section:
```html
  <section class="consignment-hero-image">
    <div class="section-inner">
      <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop" alt="Artist studio" class="consignment-img">
    </div>
  </section>
```

- [ ] **Step 4: Make footer contact clickable**

- [ ] **Step 5: Commit**

```bash
git add pages/consignment.html
git commit -m "feat(consignment): add global HTML + hero image"
```

---

### Task 12: Update `pages/contact.html`

**Files:**
- Modify: `pages/contact.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Get in touch with Kay's Originals gallery in Austin, TX.">
  <meta property="og:title" content="Contact — Kay's Originals">
  <meta property="og:description" content="Get in touch with Kay's Originals gallery in Austin, TX.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="contact"`, skip link, `<main>` landmark**

- [ ] **Step 3: Make gallery info email/phone clickable**

In the `.contact-info` section (lines 78-95), replace:
```html
            <p>info@kaysoriginals.com</p>
```
with:
```html
            <p><a href="mailto:info@kaysoriginals.com">info@kaysoriginals.com</a></p>
```

And replace:
```html
            <p>(555) 012-3456</p>
```
with:
```html
            <p><a href="tel:+15550123456">(555) 012-3456</a></p>
```

- [ ] **Step 4: Add FAQ link**

After the `<h2>Send a Message</h2>` heading (line 49), add:
```html
          <p class="form-faq-link">Looking for quick answers? Check our <a href="faq.html">FAQ</a>.</p>
```

- [ ] **Step 5: Add form success message container**

After the submit button (line 72), add:
```html
            <div id="formSuccess" class="form-success" style="display:none;">
              Thank you for your message! We'll be in touch soon.
            </div>
```

- [ ] **Step 6: Make footer contact clickable**

- [ ] **Step 7: Commit**

```bash
git add pages/contact.html
git commit -m "feat(contact): add global HTML + clickable info + FAQ link + form success container"
```

---

### Task 13: Update `pages/faq.html`

**Files:**
- Modify: `pages/faq.html`

- [ ] **Step 1: Add global `<head>` elements**

```html
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Frequently asked questions about visiting and consigning artwork at Kay's Originals.">
  <meta property="og:title" content="FAQ — Kay's Originals">
  <meta property="og:description" content="Frequently asked questions about visiting and consigning artwork at Kay's Originals.">
  <meta property="og:image" content="../images/KaysOrigLogo.png">
  <meta property="og:type" content="website">
```

- [ ] **Step 2: Add `data-page="faq"`, skip link, `<main>` landmark**

- [ ] **Step 3: Add `id` and `aria-controls` to FAQ items**

For each FAQ item, add an `id` to the `.faq-answer` div and `aria-controls` to the button. Example for the first item:

```html
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-1">
          What types of artwork does Kay's Originals feature?
        </button>
        <div class="faq-answer" id="faq-answer-1" hidden>
          <p>We feature a diverse collection...</p>
        </div>
      </div>
```

Repeat for all 8 FAQ items (`faq-answer-1` through `faq-answer-8`), adding `hidden` attribute to all answer divs (they start collapsed).

- [ ] **Step 4: Make footer contact clickable**

- [ ] **Step 5: Commit**

```bash
git add pages/faq.html
git commit -m "feat(faq): add global HTML + ARIA improvements (aria-controls, hidden attribute)"
```

---

## Chunk 5: JavaScript Logic

### Task 14: Add Active Nav Highlighting to `js/main.js`

**Files:**
- Modify: `js/main.js` (near the top of the IIFE, after helper functions)

- [ ] **Step 1: Add active nav logic**

After the existing helper functions (around line 17), add:

```javascript
  // ===== ACTIVE NAV STATE =====
  (function() {
    var page = document.body.dataset.page;
    if (!page) return;
    var links = document.querySelectorAll('.nav-link');
    var map = {
      home: null,
      gallery: 'gallery.html',
      artists: 'artists.html',
      consignment: 'consignment.html',
      about: 'about.html',
      contact: 'contact.html',
      faq: 'faq.html'
    };
    var target = map[page];
    links.forEach(function(link) {
      link.classList.remove('active');
      if (target && link.getAttribute('href').indexOf(target) !== -1) {
        link.classList.add('active');
      }
    });
  })();
```

- [ ] **Step 2: Remove hardcoded `active` classes from all HTML nav links**

In all 9 HTML files, remove the hardcoded `class="nav-link active"` and replace with just `class="nav-link"`. The JS will now handle this dynamically.

- [ ] **Step 3: Commit**

```bash
git add js/main.js index.html pages/gallery.html pages/artwork.html pages/artist.html pages/artists.html pages/about.html pages/consignment.html pages/contact.html pages/faq.html
git commit -m "feat(nav): dynamic active nav highlighting via data-page attribute"
```

---

### Task 15: Add Gallery Filtering with Artist Dropdown, Sort, and Empty State to `js/main.js`

**Files:**
- Modify: `js/main.js:95-130` (gallery section)

- [ ] **Step 1: Replace the existing `renderGallery()` function**

Replace the gallery rendering block with this enhanced version that adds artist filter, sort, and empty state:

```javascript
  // ===== GALLERY =====
  var galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    var artistFilter = document.getElementById('artistFilter');
    var sortSelect = document.getElementById('sortSelect');
    var galleryEmpty = document.getElementById('galleryEmpty');
    var clearFiltersBtn = document.getElementById('clearFilters');
    var pills = document.querySelectorAll('.filter-pill');
    var searchInput = document.querySelector('.gallery-search');
    var resultsCount = document.querySelector('.results-count');
    var currentCategory = getParam('category') || '';
    var currentArtist = '';
    var currentSort = 'default';
    var currentSearch = '';

    // Populate artist dropdown
    if (artistFilter) {
      var artistList = KaysData.getArtistList();
      artistList.forEach(function(a) {
        var opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = a.name;
        artistFilter.appendChild(opt);
      });
    }

    // Set active pill from URL param
    if (currentCategory) {
      pills.forEach(function(p) {
        p.classList.toggle('active', p.dataset.category === currentCategory);
      });
    }

    function renderGallery() {
      var artworks = KaysData.artworks.slice();

      // Filter by category
      if (currentCategory) {
        artworks = artworks.filter(function(a) { return a.category === currentCategory; });
      }

      // Filter by artist
      if (currentArtist) {
        artworks = artworks.filter(function(a) { return a.artistId === currentArtist; });
      }

      // Filter by search
      if (currentSearch) {
        var q = currentSearch.toLowerCase();
        artworks = artworks.filter(function(a) {
          var artist = KaysData.getArtist(a.artistId);
          return a.title.toLowerCase().indexOf(q) !== -1 ||
                 (artist && artist.name.toLowerCase().indexOf(q) !== -1) ||
                 a.medium.toLowerCase().indexOf(q) !== -1;
        });
      }

      // Sort
      if (currentSort === 'newest') {
        artworks.sort(function(a, b) {
          var ya = parseInt(a.year) || 0;
          var yb = parseInt(b.year) || 0;
          return yb - ya;
        });
      } else if (currentSort === 'artist') {
        artworks.sort(function(a, b) {
          var na = (KaysData.getArtist(a.artistId) || {}).name || '';
          var nb = (KaysData.getArtist(b.artistId) || {}).name || '';
          return na.localeCompare(nb);
        });
      } else if (currentSort === 'title') {
        artworks.sort(function(a, b) { return a.title.localeCompare(b.title); });
      }

      // Determine which are "recently added" (last 4 in original data array)
      var totalCount = KaysData.artworks.length;
      var recentIds = KaysData.artworks.slice(totalCount - 4).map(function(a) { return a.id; });

      galleryGrid.innerHTML = artworks.map(function(art) {
        var isRecent = recentIds.indexOf(art.id) !== -1;
        return renderArtworkCard(art, isRecent);
      }).join('');

      // Results count
      if (resultsCount) {
        resultsCount.textContent = artworks.length + ' piece' + (artworks.length !== 1 ? 's' : '');
      }

      // Empty state
      if (galleryEmpty) {
        galleryEmpty.style.display = artworks.length === 0 ? 'block' : 'none';
        galleryGrid.style.display = artworks.length === 0 ? 'none' : '';
      }
    }

    // Event listeners
    pills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        currentCategory = this.dataset.category || '';
        pills.forEach(function(p) { p.classList.toggle('active', p === pill); });
        renderGallery();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        currentSearch = this.value;
        renderGallery();
      });
    }

    if (artistFilter) {
      artistFilter.addEventListener('change', function() {
        currentArtist = this.value;
        renderGallery();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        renderGallery();
      });
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentCategory = '';
        currentArtist = '';
        currentSearch = '';
        currentSort = 'default';
        if (searchInput) searchInput.value = '';
        if (artistFilter) artistFilter.value = '';
        if (sortSelect) sortSelect.value = 'default';
        pills.forEach(function(p) { p.classList.toggle('active', !p.dataset.category); });
        renderGallery();
      });
    }

    renderGallery();
  }
```

- [ ] **Step 2: Update `renderArtworkCard()` to accept `isRecent` param and show badge + dimensions**

Modify the existing `renderArtworkCard` function to:
```javascript
  function renderArtworkCard(art, isRecent) {
    var artist = KaysData.getArtist(art.artistId);
    var base = window.PAGE_BASE || '';
    var badge = isRecent ? '<span class="badge-new">Recently Added</span> ' : '';
    return '<article class="artwork-card">' +
      '<a href="' + base + 'artwork.html?id=' + art.id + '">' +
        '<div class="card-frame">' +
          '<img src="' + art.image + '" alt="' + art.title + '" loading="lazy">' +
          '<div class="card-overlay">' +
            '<span class="card-title">' + art.title + '</span>' +
            '<span class="card-artist">' + (artist ? artist.name : '') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="card-info">' +
          '<span class="card-category">' + capitalize(art.category) + '</span>' +
          badge +
          '<h3>' + art.title + '</h3>' +
          '<p class="card-artist-name">' + (artist ? artist.name : '') + '</p>' +
          '<p class="card-year">' + art.year + '</p>' +
          (art.dimensions ? '<p class="card-dimensions">' + art.dimensions + '</p>' : '') +
        '</div>' +
      '</a>' +
    '</article>';
  }
```

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat(gallery): add artist dropdown filter, sort, empty state, recently-added badges, dimension display"
```

---

### Task 16: Add Dynamic Page Titles and Meta Tags to `js/main.js`

**Files:**
- Modify: `js/main.js` (artwork detail and artist detail sections)

- [ ] **Step 1: Add dynamic title and meta to artwork detail section**

In the artwork detail rendering code (after loading artwork data), add:

```javascript
    // Dynamic page title
    document.title = artwork.title + ' — Kay\'s Originals';

    // Dynamic meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', artwork.title + ' by ' + artist.name + ' — view at Kay\'s Originals gallery.');
    }

    // Dynamic OG tags
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle) ogTitle.setAttribute('content', artwork.title + ' — Kay\'s Originals');
    if (ogDesc) ogDesc.setAttribute('content', artwork.title + ' by ' + artist.name);
    if (ogImage) ogImage.setAttribute('content', artwork.imageLg || artwork.image);
```

- [ ] **Step 2: Add dynamic title and meta to artist detail section**

In the artist detail rendering code (after loading artist data), add:

```javascript
    // Dynamic page title
    document.title = artist.name + ' — Kay\'s Originals';

    // Dynamic meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', artist.name + ' — ' + artist.media + ' artist at Kay\'s Originals gallery.');
    }

    // Dynamic OG tags
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle) ogTitle.setAttribute('content', artist.name + ' — Kay\'s Originals');
    if (ogDesc) ogDesc.setAttribute('content', artist.shortBio);
    if (ogImage) ogImage.setAttribute('content', artist.photo);
```

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat(seo): dynamic page titles and meta/OG tags for artwork and artist detail pages"
```

---

### Task 17: Add Lightbox to `js/main.js`

**Files:**
- Modify: `js/main.js` (artwork detail section)

- [ ] **Step 1: Add lightbox creation and event handling**

After the artwork detail rendering code, add:

```javascript
    // ===== LIGHTBOX =====
    var artImg = document.querySelector('.artwork-detail-image');
    if (artImg) {
      artImg.addEventListener('click', function() {
        var lightbox = document.createElement('div');
        lightbox.className = 'lightbox active';
        lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button>' +
          '<img src="' + (artwork.imageLg || artwork.image) + '" alt="' + artwork.title + '">';
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        function closeLightbox() {
          lightbox.remove();
          document.body.style.overflow = '';
        }

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function onEsc(e) {
          if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', onEsc);
          }
        });
      });
    }
```

- [ ] **Step 2: Ensure artwork image has the `artwork-detail-image` class**

In the artwork detail rendering HTML string, add `class="artwork-detail-image"` to the main artwork `<img>` tag.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat(artwork): add image lightbox with keyboard and backdrop close"
```

---

### Task 18: Add "More by This Artist" Section to `js/main.js`

**Files:**
- Modify: `js/main.js` (artwork detail section)

- [ ] **Step 1: Add "More by Artist" rendering after artwork detail**

After lightbox code in the artwork detail section:

```javascript
    // ===== MORE BY THIS ARTIST =====
    var moreSection = document.getElementById('moreByArtist');
    var moreGrid = document.getElementById('moreByArtistGrid');
    var moreHeading = document.getElementById('moreByArtistHeading');
    if (moreSection && moreGrid && artist) {
      var otherWorks = KaysData.getArtworksByArtist(artwork.artistId)
        .filter(function(a) { return a.id !== artwork.id; });
      if (otherWorks.length > 0) {
        moreHeading.textContent = 'More by ' + artist.name;
        moreGrid.innerHTML = otherWorks.map(function(a) {
          return renderArtworkCard(a, false);
        }).join('');
        moreSection.style.display = '';
      }
    }
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(artwork): add 'More by This Artist' section below detail"
```

---

### Task 19: Add JSON-LD Structured Data to `js/main.js`

**Files:**
- Modify: `js/main.js` (artwork detail and artist detail sections)

- [ ] **Step 1: Inject VisualArtwork JSON-LD on artwork detail**

After the dynamic meta tags in the artwork detail section:

```javascript
    // ===== JSON-LD =====
    var jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      name: artwork.title,
      creator: { '@type': 'Person', name: artist.name },
      dateCreated: artwork.year,
      artMedium: artwork.medium,
      image: artwork.imageLg || artwork.image,
      description: artwork.description
    });
    document.head.appendChild(jsonLd);
```

- [ ] **Step 2: Inject Person JSON-LD on artist detail**

After the dynamic meta tags in the artist detail section:

```javascript
    // ===== JSON-LD =====
    var jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: artist.name,
      description: artist.bio,
      image: artist.photo,
      jobTitle: 'Artist'
    });
    document.head.appendChild(jsonLd);
```

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat(seo): add JSON-LD structured data for artwork and artist detail pages"
```

---

### Task 20: Update Contact Form Validation in `js/main.js`

**Files:**
- Modify: `js/main.js:301-308` (contact form section)

- [ ] **Step 1: Replace `alert()` with inline validation and success message**

Replace the existing contact form handler with:

```javascript
  // ===== CONTACT FORM =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      var errorMsgs = contactForm.querySelectorAll('.form-error-msg');
      errorMsgs.forEach(function(el) { el.remove(); });
      var errorGroups = contactForm.querySelectorAll('.form-group.has-error');
      errorGroups.forEach(function(el) { el.classList.remove('has-error'); });

      var valid = true;
      var required = contactForm.querySelectorAll('[required]');
      required.forEach(function(field) {
        if (!field.value.trim()) {
          valid = false;
          var group = field.closest('.form-group');
          if (group) {
            group.classList.add('has-error');
            var err = document.createElement('div');
            err.className = 'form-error-msg';
            err.textContent = 'This field is required.';
            group.appendChild(err);
          }
        }
      });

      if (valid) {
        contactForm.reset();
        if (formSuccess) formSuccess.style.display = 'block';
      }
    });
  }
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(contact): replace alert() with inline form validation and success message"
```

---

### Task 21: Update FAQ Accordion with ARIA and Keyboard Support in `js/main.js`

**Files:**
- Modify: `js/main.js:281-296` (FAQ section)

- [ ] **Step 1: Update FAQ toggle to handle `hidden` attribute**

Replace the existing FAQ accordion code with:

```javascript
  // ===== FAQ ACCORDION =====
  var faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(function(btn) {
    var answer = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function() {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isOpen);
      btn.closest('.faq-item').classList.toggle('open', !isOpen);
      if (answer) {
        if (isOpen) {
          answer.setAttribute('hidden', '');
        } else {
          answer.removeAttribute('hidden');
        }
      }
    });
  });
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(faq): update accordion with hidden attribute and aria-controls support"
```

---

### Task 22: Add Mobile Menu Backdrop to `js/main.js`

**Files:**
- Modify: `js/main.js:313-343` (mobile nav section)

- [ ] **Step 1: Update hamburger toggle to create and manage backdrop**

Replace or augment the existing mobile nav code with:

```javascript
  // ===== MOBILE NAV =====
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    // Create backdrop
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function toggleMenu() {
      var isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', !isOpen);
      backdrop.classList.toggle('active', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    }

    function closeMenu() {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close on nav link click
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(nav): add mobile menu backdrop overlay"
```

---

### Task 23: Add Artist Detail Hero Banner to `js/main.js`

**Files:**
- Modify: `js/main.js:239-276` (artist detail section)

- [ ] **Step 1: Add `artist-hero-banner` class to the artist profile container**

In the artist detail rendering code, wrap the artist bio section with the `.artist-hero-banner` class. Find where the artist profile HTML is generated and add the class to the outer container div.

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(artist): add hero banner gradient to artist detail page"
```

---

### Task 24: Add Artists Page Empty State Logic to `js/main.js`

**Files:**
- Modify: `js/main.js:206-234` (artists page section)

- [ ] **Step 1: Update `renderArtists()` to show/hide empty state**

After the artist grid rendering:

```javascript
    var artistsEmpty = document.getElementById('artistsEmpty');
    var clearArtistSearch = document.getElementById('clearArtistSearch');

    // In the renderArtists function, after filtering:
    if (artistsEmpty) {
      artistsEmpty.style.display = filtered.length === 0 ? 'block' : 'none';
      allArtistsGrid.style.display = filtered.length === 0 ? 'none' : '';
    }

    if (clearArtistSearch) {
      clearArtistSearch.addEventListener('click', function(e) {
        e.preventDefault();
        var searchInput = document.querySelector('.artist-search');
        if (searchInput) searchInput.value = '';
        renderArtists('');
      });
    }
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(artists): add empty state for no-results search"
```

---

## Chunk 6: New Files

### Task 25: Create `pages/404.html`

**Files:**
- Create: `pages/404.html`

- [ ] **Step 1: Create the 404 page**

Create `pages/404.html` with the standard nav, footer, skip link, main landmark, and a centered message:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — Kay's Originals</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" href="../images/favicon.png" type="image/png">
  <meta name="description" content="Page not found — Kay's Originals gallery.">
</head>
<body data-page="">
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="color-bar"></div>
  <nav class="main-nav" id="mainNav">
    <div class="nav-inner">
      <a href="../index.html" class="nav-brand">
        <img src="../images/KaysOrigLogo.png" alt="Kay's Originals" class="nav-logo">
        <span class="nav-slogan">Discover Original Art</span>
      </a>
      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li><a href="gallery.html" class="nav-link">Gallery</a></li>
        <li><a href="artists.html" class="nav-link">Artists</a></li>
        <li><a href="consignment.html" class="nav-link">Consignment</a></li>
        <li><a href="about.html" class="nav-link">About</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main id="main-content">
    <section class="page-hero">
      <div class="section-inner hero-center">
        <h1>Page Not Found</h1>
        <p class="hero-subtitle">The page you're looking for doesn't exist or has been moved.</p>
        <a href="gallery.html" class="btn btn-primary" style="margin-top:1.5rem;">Return to Gallery</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="../images/KaysOrigLogo.png" alt="Kay's Originals" class="footer-logo">
        <p class="footer-slogan">Discover Original Art</p>
        <p class="footer-tagline">A curated gallery celebrating bold, original artwork from visionary artists.</p>
      </div>
      <div class="footer-links">
        <h4>Explore</h4>
        <ul>
          <li><a href="gallery.html?category=painting">Paintings</a></li>
          <li><a href="gallery.html?category=sculpture">Sculptures</a></li>
          <li><a href="gallery.html?category=sketch">Sketches</a></li>
          <li><a href="gallery.html">All Artwork</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="consignment.html">Consignment</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Get in Touch</h4>
        <p><strong>Email</strong><br><a href="mailto:info@kaysoriginals.com">info@kaysoriginals.com</a></p>
        <p><strong>Phone</strong><br><a href="tel:+15550123456">(555) 012-3456</a></p>
        <p><strong>Location</strong><br>Austin, TX</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Kay's Originals. All rights reserved.</p>
    </div>
  </footer>

  <script>window.PAGE_BASE = '';</script>
  <script src="../js/data.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add pages/404.html
git commit -m "feat: add branded 404 page"
```

---

### Task 26: Create `images/favicon.png`

**Files:**
- Create: `images/favicon.png`

- [ ] **Step 1: Generate a minimal 32x32 PNG favicon**

Use a small Node.js script or base64 decode to create a solid teal (`#2a9d8f`) 32x32 PNG:

```bash
node -e "
const fs = require('fs');
// Minimal 32x32 PNG - solid teal square
// Pre-built base64 PNG
const b64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAMklEQVR4nO3NQREAAAjDMKhf0dBRw04NGEnyat8S4AIcOHDgwIEDBw4cOHDgwIEDB44LB88WAR+F1ZAAAAAASUVORK5CYII=';
fs.writeFileSync('images/favicon.png', Buffer.from(b64, 'base64'));
console.log('favicon.png created');
"
```

If Node.js is not available, use Python:
```bash
python -c "
import base64
b64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAMklEQVR4nO3NQREAAAjDMKhf0dBRw04NGEnyat8S4AIcOHDgwIEDBw4cOHDgwIEDB44LB88WAR+F1ZAAAAAASUVORK5CYII='
with open('images/favicon.png', 'wb') as f:
    f.write(base64.b64decode(b64))
print('favicon.png created')
"
```

- [ ] **Step 2: Verify the file exists**

```bash
ls -la images/favicon.png
```

- [ ] **Step 3: Commit**

```bash
git add images/favicon.png
git commit -m "feat: add teal favicon PNG"
```

---

## Summary of Changes by Spec Section

| Spec Section | Tasks |
|---|---|
| 1. Data Layer | Tasks 1-3 |
| 2. Global HTML Changes | Tasks 5-13 (applied per-page) |
| 3. Homepage | Task 5 |
| 4. Gallery Page | Tasks 6, 15 |
| 5. Artwork Detail | Tasks 7, 16-19 |
| 6. Artists Page | Tasks 9, 24 |
| 7. Artist Detail | Tasks 8, 16, 19, 23 |
| 8. About Page | Task 10 |
| 9. Consignment Page | Task 11 |
| 10. Contact Page | Tasks 12, 20 |
| 11. FAQ Page | Tasks 13, 21 |
| 12. CSS | Task 4 |
| 13. JavaScript | Tasks 14-24 |
| 14. New Files | Tasks 25-26 |

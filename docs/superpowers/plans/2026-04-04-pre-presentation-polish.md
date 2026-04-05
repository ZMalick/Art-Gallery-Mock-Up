# Pre-Presentation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the site visually and clean up code before teacher review.

**Architecture:** Seven independent changes across `js/data.js` (artwork images), `css/styles.css` (footer, cards, quote, typography, mobile), and `js/main.js` (contact form cleanup). No new files created.

**Tech Stack:** Vanilla HTML/CSS/JS. Verification via Playwright screenshots.

---

## File Map

| File | Changes |
|------|---------|
| `js/data.js` | Replace all Unsplash `image`/`imageLg` URLs with Wikimedia Commons URLs for famous works; find thematic images for fictional works |
| `css/styles.css` | Footer spacing (~L1031-1113), artist card hover (~L817-819), quote section (~L1698-1729), section padding audit, mobile breakpoints |
| `js/main.js` | Remove custom validation logic (~L685-702) |

---

### Task 1: Replace Artwork Images — Famous Works

**Files:**
- Modify: `js/data.js:93-408`

Replace each famous artwork's Unsplash URLs with the actual artwork image from Wikimedia Commons. Use `upload.wikimedia.org` direct image URLs with appropriate sizing.

- [ ] **Step 1: Replace Starry Night (line ~103-104)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/600px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
```

- [ ] **Step 2: Replace Water Lilies (line ~118-119)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/600px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
```

- [ ] **Step 3: Replace The Thinker (line ~133-134)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mus%C3%A9e_Rodin_1.jpg/600px-Mus%C3%A9e_Rodin_1.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mus%C3%A9e_Rodin_1.jpg/1280px-Mus%C3%A9e_Rodin_1.jpg',
```

- [ ] **Step 4: Replace Self-Portrait with Thorn Necklace (line ~148-149)**

```js
image: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Frida_Kahlo_%28self_portrait%29.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Frida_Kahlo_%28self_portrait%29.jpg',
```

- [ ] **Step 5: Replace Vitruvian Man (line ~163-164)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/600px-Da_Vinci_Vitruve_Luc_Viatour.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/1280px-Da_Vinci_Vitruve_Luc_Viatour.jpg',
```

- [ ] **Step 6: Replace Les Demoiselles d'Avignon (line ~178-179)**

```js
image: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg',
```

- [ ] **Step 7: Replace Guernica (line ~193-194)**

```js
image: 'https://upload.wikimedia.org/wikipedia/en/7/74/Guernica_%28Picasso%29.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/en/7/74/Guernica_%28Picasso%29.jpg',
```

- [ ] **Step 8: Replace Impression, Sunrise (line ~208-209)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/600px-Monet_-_Impression%2C_Sunrise.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg',
```

- [ ] **Step 9: Replace The Kiss — Rodin (line ~223-224)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rodin_-_The_Kiss.jpg/600px-Rodin_-_The_Kiss.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rodin_-_The_Kiss.jpg/1280px-Rodin_-_The_Kiss.jpg',
```

- [ ] **Step 10: Replace Anatomy Studies (line ~238-239)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Leonardo_da_Vinci_-_Anatomical_studies_of_the_shoulder_-_WGA12824.jpg/600px-Leonardo_da_Vinci_-_Anatomical_studies_of_the_shoulder_-_WGA12824.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Leonardo_da_Vinci_-_Anatomical_studies_of_the_shoulder_-_WGA12824.jpg/1280px-Leonardo_da_Vinci_-_Anatomical_studies_of_the_shoulder_-_WGA12824.jpg',
```

- [ ] **Step 11: Replace The Two Fridas (line ~253-254)**

```js
image: 'https://upload.wikimedia.org/wikipedia/en/d/d9/The_Two_Fridas.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/en/d/d9/The_Two_Fridas.jpg',
```

- [ ] **Step 12: Replace Sunflowers (line ~268-269)**

```js
image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/600px-Vincent_Willem_van_Gogh_127.jpg',
imageLg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/1280px-Vincent_Willem_van_Gogh_127.jpg',
```

- [ ] **Step 13: Verify famous artwork images load**

Open the gallery page in Playwright, take a screenshot, confirm all famous artwork thumbnails render correctly (no broken images).

---

### Task 2: Replace Artwork Images — Fictional Works

**Files:**
- Modify: `js/data.js:275-408`

For the fictional artists' works, find thematically appropriate Unsplash images. Use web search to find suitable matches.

- [ ] **Step 1: Search and replace Desert Bloom (torres, abstract landscape)**

Find a vivid abstract landscape painting image on Unsplash. Replace line ~284-285.

- [ ] **Step 2: Search and replace Amber Horizon (torres, warm tones landscape)**

Find a warm sunset/amber landscape painting image. Replace line ~299-300.

- [ ] **Step 3: Search and replace Vessel of Memory (whitfield, found-object sculpture)**

Find a metal/mixed-media sculpture image. Replace line ~329-330.

- [ ] **Step 4: Search and replace Bridge and Fog (chen, ink drawing of bridge)**

Find a bridge in fog sketch/drawing image. Replace line ~344-345.

- [ ] **Step 5: Search and replace Stairwell Light (chen, charcoal spiral staircase)**

Find a spiral staircase architectural sketch image. Replace line ~359-360.

- [ ] **Step 6: Search and replace Portrait in Gold (grant, oil portrait)**

Find a warm-toned painted portrait image. Replace line ~374-375.

- [ ] **Step 7: Search and replace Gesture Study IV (grant, charcoal gesture drawing)**

Find a charcoal gesture/figure drawing image. Replace line ~389-390.

- [ ] **Step 8: Search and replace Evening Figure (grant, figure against sky)**

Find a silhouetted figure at dusk painting. Replace line ~404-405.

- [ ] **Step 9: Verify fictional artwork images load**

Open the gallery page, confirm all artwork thumbnails render. Take screenshot.

- [ ] **Step 10: Commit**

```bash
git add js/data.js
git commit -m "Replace placeholder artwork images with real art and thematic matches"
```

---

### Task 3: Footer Spacing & Alignment

**Files:**
- Modify: `css/styles.css:1031-1113`

- [ ] **Step 1: Adjust grid column proportions and gap**

Replace the footer-inner grid rule:

```css
/* OLD */
grid-template-columns: 1.6fr 1fr 1fr 1.1fr;
gap: 2.5rem;

/* NEW */
grid-template-columns: 1.3fr 1fr 1fr 1.2fr;
gap: 3rem;
```

- [ ] **Step 2: Tighten brand column spacing**

Replace footer-logo margin:
```css
/* OLD */
margin-bottom: 1rem;
/* NEW */
margin-bottom: 0.6rem;
```

Replace footer-slogan margin:
```css
/* OLD */
margin-bottom: 0.75rem;
/* NEW */
margin-bottom: 0.4rem;
```

- [ ] **Step 3: Normalize column heading alignment**

Replace footer heading margin:
```css
/* OLD */
margin-bottom: 1.25rem;
/* NEW */
margin-bottom: 1rem;
```

- [ ] **Step 4: Tighten Get in Touch contact spacing**

Replace footer-contact p margin:
```css
/* OLD */
margin-bottom: 1rem;
/* NEW */
margin-bottom: 0.75rem;
```

Replace footer-contact strong margin:
```css
/* OLD */
margin-bottom: 0.15rem;
/* NEW */
margin-bottom: 0.25rem;
```

- [ ] **Step 5: Verify footer layout**

Take Playwright screenshot of footer on homepage. Confirm even column distribution and tighter brand section.

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "Fix footer spacing and column alignment"
```

---

### Task 4: Gallery Card Hover Consistency

**Files:**
- Modify: `css/styles.css:817-819`

The artwork card uses `translateY(-8px)` + `0 20px 48px rgba(0,0,0,0.1)` shadow. The artist card uses `translateY(-6px)` + `0 16px 40px rgba(0,0,0,0.09)`. Standardize.

- [ ] **Step 1: Update artist card hover to match artwork card**

Replace `.artist-card:hover` (line ~817-819):

```css
.artist-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.1);
}
```

- [ ] **Step 2: Verify hover states**

Open gallery page in Playwright, hover over both artwork and artist cards, confirm matching lift height and shadow.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "Standardize card hover states across artwork and artist cards"
```

---

### Task 5: About Page Quote Section

**Files:**
- Modify: `css/styles.css:1698-1729`

- [ ] **Step 1: Add left border accent and left-align**

Replace the quote section styles:

```css
.quote-section {
  background: var(--charcoal);
  padding: 3.5rem 0;
}

.founder-quote {
  max-width: 680px;
  margin: 0 auto;
  text-align: left;
  border: none;
  border-left: 4px solid var(--teal);
  padding: 0 0 0 2rem;
}

.founder-quote p {
  font-family: var(--font-heading);
  font-size: 1.65rem;
  font-weight: 400;
  font-style: italic;
  color: var(--white);
  line-height: 1.45;
  margin-bottom: 1rem;
}
```

(Keep `.founder-quote cite` unchanged — it's already styled well.)

- [ ] **Step 2: Verify about page quote**

Take Playwright screenshot of the about page quote section. Confirm teal left border, left-aligned text, larger font.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "Add editorial left-border accent to about page quote"
```

---

### Task 6: Typography Rhythm

**Files:**
- Modify: `css/styles.css` (section spacing rules)

- [ ] **Step 1: Audit current section padding**

Search all section padding declarations in styles.css. Identify the most common value and any outliers.

- [ ] **Step 2: Normalize section padding to the baseline**

Update any outlier sections to use the most common padding value. Target consistency — all content sections should use the same vertical padding (likely `4rem 0` or `5rem 0`).

- [ ] **Step 3: Normalize heading-to-content gaps**

Ensure all section headings have a consistent `margin-bottom` of `1rem` to `1.25rem` before the first paragraph/content.

- [ ] **Step 4: Verify typography rhythm**

Take Playwright screenshots of homepage, gallery, about, and contact pages. Confirm consistent vertical spacing between sections.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "Normalize section spacing and typography rhythm"
```

---

### Task 7: Contact Form JS Cleanup

**Files:**
- Modify: `js/main.js:682-707`

- [ ] **Step 1: Remove custom validation, keep radio toggle and success flow**

Replace the submit handler (lines 682-708) with:

```js
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.reset();
      if (formSuccess) formSuccess.style.display = 'block';
    });
```

This keeps: radio toggle (lines 674-680, untouched), form reset, success message.
Removes: error clearing, empty-field loop, `.has-error` logic, `.form-error-msg` creation.

- [ ] **Step 2: Remove unused CSS classes if present**

Search `css/styles.css` for `.has-error` and `.form-error-msg`. If found, remove those rules.

- [ ] **Step 3: Verify contact form**

Open contact page in Playwright. Submit empty form — browser should show native validation. Fill all required fields and submit — success message should appear.

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/styles.css
git commit -m "Remove redundant JS form validation, rely on HTML5 required"
```

---

### Task 8 (Low Priority): Mobile Responsiveness Pass

**Files:**
- Modify: `css/styles.css` (640px and 1023px breakpoints)

- [ ] **Step 1: Verify gallery grid at 375px**

Resize Playwright viewport to 375px width. Check if gallery grid shows single-column cards. If the current `minmax(280px, 1fr)` already handles it, no change needed.

- [ ] **Step 2: Check consignment contact grid stacking**

Navigate to consignment page at 375px. If the contact section doesn't stack properly, add a rule inside the 640px breakpoint.

- [ ] **Step 3: Check artist-signup layout**

Navigate to artist-signup page at 375px. If two-column layout doesn't stack, add a rule inside the 640px breakpoint.

- [ ] **Step 4: Fix any issues found and commit**

```bash
git add css/styles.css
git commit -m "Fix mobile layout stacking at narrow viewports"
```

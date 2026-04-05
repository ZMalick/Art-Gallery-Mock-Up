# Pre-Presentation Polish — Design Spec

**Date:** 2026-04-04
**Scope:** 7 targeted improvements before teacher review

---

## 1. Artwork Images — Replace Placeholders with Real Art

**Problem:** All artwork in `js/data.js` uses random Unsplash photos (flowers, paintbrushes) that don't match the artwork titles (Starry Night, Water Lilies, The Thinker, etc.).

**Solution:**
- For each artwork entry in `data.js`, replace `image` and `imageLg` URLs with the actual painting/sculpture image from Wikimedia Commons
- Use appropriately sized versions (600x750 for `image`, 1000x800 for `imageLg`)
- For fictional pieces that aren't real famous works, find a thematically appropriate public domain image
- Keep external URLs — the existing `resolveImageSrc()` pattern already skips `IMAGE_BASE` for http URLs

**Files:** `js/data.js`

---

## 2. Footer Spacing & Alignment

**Problem:** The 4-column footer grid has uneven spacing and alignment. The brand column feels too spread out, and column headings don't align cleanly.

**Solution:**
- Adjust grid column fractions for more even distribution
- Increase column gap slightly for breathing room
- Tighten brand column: reduce vertical spacing between logo, slogan, and tagline
- Normalize heading margin/padding across all four columns
- Ensure consistent label-to-value spacing in the "Get in Touch" column

**Files:** `css/styles.css` (footer section, ~lines 1023–1113)

---

## 3. Gallery Card Hover Consistency

**Problem:** Artwork cards and artist cards may have inconsistent hover behavior (different translateY values, shadow depths, or transition timing).

**Solution:**
- Audit `.artwork-card:hover` and `.artist-card:hover` (and any other card types)
- Standardize on `translateY(-8px)` with matching shadow (`0 20px 48px rgba(0,0,0,0.1)`)
- Ensure identical transition timing (`0.4s cubic-bezier`) across all card variants

**Files:** `css/styles.css` (card sections)

---

## 4. About Page Quote Section

**Problem:** The founder quote section uses a plain dark block with centered text. Lacks editorial character.

**Solution:**
- Add left border accent using `var(--color-teal)`, 3–4px width
- Left-align quote text with appropriate left padding
- Slight font size increase for the quote text (1.5rem → 1.65rem)
- Keep the dark charcoal background section
- Maintain `cite` styling as-is (already styled well)

**Files:** `css/styles.css` (quote section, ~lines 1698–1729)

---

## 5. Typography Rhythm

**Problem:** Inconsistent vertical spacing between sections across pages.

**Solution:**
- Audit all `<section>` padding values and converge on a single standard (use the most common existing value as the baseline)
- Ensure heading-to-first-paragraph gap is consistent (target 1–1.25rem)
- Audit `.section-inner` containers for consistent max-width and horizontal padding

**Files:** `css/styles.css` (section spacing rules)

---

## 6. Mobile Responsiveness Pass

**Problem:** Some layouts don't stack properly at narrow viewports.

**Targets:**
- **Gallery grid at 375px:** Ensure single-column full-width cards (verify `minmax` value works at this width)
- **Consignment contact grid:** Stack the two-column contact layout at the 640px breakpoint
- **Artist-signup two-column layout:** Stack to single column on small screens

**Files:** `css/styles.css` (responsive sections at 1023px and 640px breakpoints)

---

## 7. Contact Form JS Cleanup

**Problem:** Custom JS validation in `main.js` (lines 666–709) duplicates browser-native HTML5 `required` validation. The browser intercepts first, making the JS path unreachable.

**Solution:**
- Remove the custom empty-field checking loop, `.has-error` class additions, and `.form-error-msg` div insertion
- Keep the radio toggle listener (visitor-type show/hide artist note)
- Keep the form reset + success message display on valid submit
- CSS classes `.has-error` and `.form-error-msg` can be removed from `styles.css` if present

**Files:** `js/main.js` (~lines 666–709), possibly `css/styles.css`

---

## Out of Scope

- No new pages or features
- No changes to navigation structure
- No changes to data model or artist/artwork relationships
- Keyboard accessibility and prefers-reduced-motion — already implemented
- No backend work

# User Preferences (Zaid)

Things Zaid has explicitly stated he likes or dislikes. These are standing rules — apply them on every test run and every design pass.

---

## Design — What Zaid Likes

### Clean, Editorial Aesthetic
**Observation:** The site should feel like Uprise Art — professional, not AI-generated. Clean whitespace, intentional typography, no visual clutter.
**Status:** Preference (permanent)

### Alternating Section Backgrounds
**Observation:** Adjacent sections must alternate between `--off-white` and `--light-gray`. Visual rhythm matters — flat same-color blocks feel unfinished.
**Status:** Preference (permanent)

### Minimal Sub-page Heroes
**Observation:** Sub-page hero sections should be clean and simple. No decorative gold lines, heavy gradients, or homepage-style flourishes. The homepage hero is the showcase — sub-pages are functional.
**Status:** Preference (permanent)

### Gold Frame Accents on Artwork Cards
**Observation:** Artwork cards should have a gold frame accent (using `--gold`). It gives the cards a gallery feel that matches the editorial aesthetic.
**Status:** Preference (permanent)

### Card Hover Behavior
**Observation:** Cards should lift up with a shadow on hover — `transform: translateY()` + `box-shadow`. Feels polished, not static.
**Status:** Preference (permanent)

---

## Typography Standards (permanent)

- Headings: `DM Serif Display` (var `--font-heading`) — tight line-height (1.1–1.15)
- Body: `Outfit` (var `--font-body`) — generous line-height (1.6–1.7)
- Never use system fonts alone — always load from Google Fonts CDN
- Only animate `transform` and `opacity` — never `transition-all`

---

## Design — What Zaid Dislikes

### Flat Gray Blobs
**Observation:** The about page was almost entirely one flat gray block. Multiple adjacent sections using `--light-gray` blended together and looked unprofessional.
**Date noted:** 2026-03-15
**Status:** Preference (permanent — never stack same background colors)

### Decorative Accents on Sub-page Heroes
**Observation:** Gold lines and gradient overlays that look great on the homepage hero look out of place on sub-page heroes.
**Date noted:** 2026-03-15
**Status:** Preference (permanent)

### Generic AI Aesthetic
**Observation:** The site should not look like a default AI-generated template. Avoid: boxy card layouts with no personality, generic placeholder copy, overused shadow/border-radius combos.
**Status:** Preference (permanent)

---

## Testing — What Zaid Likes

### Full-size Playwright Screenshots
**Observation:** Screenshots should be taken at 1280x720 minimum. Thumbnails miss layout issues.
**Status:** Preference (permanent)

### Viewport Resize Before Screenshots
**Observation:** Always resize the viewport before taking screenshots — default size may crop important sections.
**Status:** Preference (permanent)

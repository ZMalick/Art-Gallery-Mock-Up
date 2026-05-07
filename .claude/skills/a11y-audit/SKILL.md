---
name: a11y-audit
description: "Audit web pages and components for accessibility issues against WCAG standards and generate fixes. Use this skill when the user wants an accessibility review, needs to fix a11y issues, wants WCAG compliance, has screen reader problems, needs ARIA fixes, or wants to make their site accessible. Triggers on: accessibility, a11y, WCAG, screen reader, ARIA, accessible, keyboard navigation, focus management, color contrast, alt text, semantic HTML."
---

# Accessibility Audit

Audit HTML/JSX/Vue files against WCAG 2.1 AA standards and generate fixes.

## Audit Process

1. **Read the target files** the user wants audited
2. **Check against WCAG criteria** organized by category
3. **Report findings** with severity and specific fixes
4. **Apply fixes** with user approval

## Audit Checklist

### Perceivable

**Images & Media**
- All `<img>` tags have meaningful `alt` text (or `alt=""` for decorative images)
- Complex images (charts, diagrams) have extended descriptions
- Videos have captions/subtitles
- Audio has transcripts
- No information conveyed solely through color

**Text & Contrast**
- Text contrast ratio >= 4.5:1 (normal text) and >= 3:1 (large text, 18px+ or 14px+ bold)
- UI component contrast >= 3:1 against adjacent colors
- Text is resizable to 200% without loss of content
- No images of text (use real text)

### Operable

**Keyboard**
- All interactive elements reachable via Tab
- Logical tab order (follows visual flow)
- No keyboard traps (can always Tab away)
- Focus indicator visible on all interactive elements (not just browser default outline)
- Custom widgets have expected keyboard patterns (Escape closes dialogs, arrows navigate menus)

**Navigation**
- Skip navigation link as first focusable element
- Page has descriptive `<title>`
- Headings follow hierarchy (h1 > h2 > h3, no skipping levels)
- Links have descriptive text (not "click here" or "read more" without context)
- Focus is managed on route changes (SPA)

**Timing**
- No auto-playing content that can't be paused
- No time limits (or user can extend)
- No content that flashes more than 3 times per second

### Understandable

**Forms**
- Every input has an associated `<label>` (visible, not just `aria-label` unless visually hidden)
- Required fields marked with `aria-required="true"` and visual indicator
- Error messages associated via `aria-describedby`
- Error messages identify the field and describe the error
- Form validation doesn't rely solely on color

**Language & Consistency**
- `<html lang="...">` is set
- Navigation is consistent across pages
- Error handling is consistent

### Robust

**Semantic HTML**
- Using semantic elements (`<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`)
- ARIA roles only used when native HTML semantics are insufficient
- ARIA attributes are valid and correctly applied
- Custom components have appropriate roles and states
- No duplicate IDs on the page

**ARIA Patterns**
- `aria-expanded` on toggles (accordions, dropdowns)
- `aria-current="page"` on active nav links
- `role="alert"` or `aria-live="polite"` for dynamic content
- `aria-hidden="true"` on decorative/duplicate content
- Modal dialogs use `role="dialog"`, `aria-modal="true"`, focus trap

## Report Format

```
## Accessibility Audit Results

### Critical (blocks access for some users)
- [file:line] Issue description
  WCAG: X.X.X (criterion name)
  Fix: Specific code change needed

### Serious (significant barrier)
- [file:line] Issue description
  WCAG: X.X.X
  Fix: Specific code change needed

### Moderate (causes difficulty)
- [file:line] Issue description
  WCAG: X.X.X
  Fix: Specific code change needed

### Minor (best practice)
- [file:line] Issue description
  Fix: Specific code change needed

### Summary
- X critical, Y serious, Z moderate, W minor issues found
- Estimated WCAG 2.1 AA compliance: [assessment]
```

## Kay's Originals — Priority Hotspots

When auditing this project, check these site-specific areas first:

| Component | File(s) | What to Check |
|-----------|---------|---------------|
| Hamburger menu | `js/main.js`, all HTML | `aria-expanded` toggles, `aria-controls` points to menu ID, Escape closes menu, focus returns to hamburger button on close |
| Lightbox | `js/main.js` | Focus trap inside overlay, Escape closes, focus returns to trigger image, `role="dialog"` + `aria-modal="true"`, `alt` on lightbox `<img>` |
| FAQ accordion | `pages/consignment.html`, `js/main.js` | `aria-expanded` on triggers, `aria-controls` + `id` pairing, Enter/Space toggles, `role="button"` if using `<div>` triggers |
| Gallery filter buttons | `pages/gallery.html`, `js/main.js` | `aria-pressed` on active filter, `role="group"` + `aria-label` on filter container, keyboard operability |
| Hero slideshow | `index.html`, `js/main.js` | Pause/stop mechanism (WCAG 2.2.2), `aria-live="polite"` on slide container or `aria-roledescription="carousel"`, `alt` text on each slide image |
| Scroll reveal | `js/main.js`, `css/styles.css` | `prefers-reduced-motion` media query disables animations, content not hidden from assistive tech before reveal |
| Nav active state | `js/main.js` | `aria-current="page"` on active nav link (not just a CSS class) |
| Contact form | `pages/contact.html` | Every input has `<label>`, `aria-required`, `aria-describedby` for error messages, form errors announced via `aria-live` region |
| Artist/artwork cards | `js/main.js` | Card links have descriptive text (not just the image), images have meaningful `alt` |

### Kay's-Specific Rules
- **No framework ARIA libraries** — all ARIA is hand-written in vanilla HTML/JS
- **ES5 constraint** — no `const`/`let`/arrow functions in any JS fixes
- **Guard pattern** — any DOM access in fixes must use `var el = ...; if (el) { ... }`

## Applying Fixes

After presenting the report, ask if the user wants fixes applied. Apply the most impactful fixes first (critical > serious > moderate > minor). Each fix should be minimal and targeted — don't restructure the user's markup beyond what's needed for accessibility.

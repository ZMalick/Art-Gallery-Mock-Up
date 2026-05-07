## Accessibility Audit Results

### Critical (blocks access for some users)
- [page.html:1] Missing `lang` attribute on `<html>` element
  WCAG: 3.1.1 (Language of Page)
  Fix: Add `lang="en"` to the `<html>` element

- [page.html:4] Image missing `alt` attribute: `<img src="logo.png">`
  WCAG: 1.1.1 (Non-text Content)
  Fix: Add descriptive `alt` text, e.g. `alt="Store logo"`, or `alt=""` if purely decorative (but since it is inside a link, it must have alt text describing the link destination)

- [page.html:9] Image missing `alt` attribute: `<img src="product1.jpg">`
  WCAG: 1.1.1 (Non-text Content)
  Fix: Add meaningful `alt` text describing the product, e.g. `alt="Cool Widget"`

- [page.html:8-10] Product card uses `div` with `onclick` for navigation -- not keyboard accessible
  WCAG: 2.1.1 (Keyboard)
  Fix: Replace with an `<a>` element wrapping the product card, or add `role="link"`, `tabindex="0"`, and a keydown handler for Enter

- [page.html:14] Subscribe button is a `<div>` with `onclick` -- not keyboard accessible or announced as a button
  WCAG: 2.1.1 (Keyboard), 4.1.2 (Name, Role, Value)
  Fix: Replace with a `<button>` element

### Serious (significant barrier)
- [page.html:4] Low contrast text: `color: #999` on `background: #fff` yields a contrast ratio of approximately 2.85:1 for normal (14px) text
  WCAG: 1.4.3 (Contrast Minimum)
  Fix: Darken the text color to at least `#767676` (4.54:1) or preferably darker, e.g. `#595959`

- [page.html:13] Email input has no associated `<label>` element; `placeholder` alone is insufficient
  WCAG: 1.3.1 (Info and Relationships), 3.3.2 (Labels or Instructions)
  Fix: Add a visible `<label for="email">` or a visually-hidden label associated with the input

- [page.html:2] No semantic landmark elements used -- entire page is `<div>` based
  WCAG: 1.3.1 (Info and Relationships)
  Fix: Replace `<div class="nav">` with `<nav>`, wrap main content in `<main>`, use `<header>` and `<footer>` as appropriate

- [page.html:2] No skip navigation link
  WCAG: 2.4.1 (Bypass Blocks)
  Fix: Add a skip-to-content link as the first focusable element

- [page.html:1] Missing `<title>` element in `<head>`
  WCAG: 2.4.2 (Page Titled)
  Fix: Add a `<head>` with a descriptive `<title>`

### Moderate (causes difficulty)
- [page.html:7] Heading hierarchy skips levels: first heading is `<h3>`, should start at `<h1>` or `<h2>` under an `<h1>`
  WCAG: 1.3.1 (Info and Relationships), 2.4.6 (Headings and Labels)
  Fix: Use `<h1>` for the page/hero heading, `<h2>` for "Featured Products", `<h2>` for "Subscribe"

- [page.html:12] "Subscribe" heading uses `<h4>` which skips from `<h3>` and the overall hierarchy is broken
  WCAG: 1.3.1 (Info and Relationships)
  Fix: Restructure headings to follow a logical hierarchy

- [page.html:8-10] Product card has no focus indicator since it is a `<div>`
  WCAG: 2.4.7 (Focus Visible)
  Fix: Using a proper `<a>` element will provide default focus styling

### Minor (best practice)
- [page.html:1] Missing `<!DOCTYPE html>` declaration
  Fix: Add `<!DOCTYPE html>` at the top of the document

- [page.html:13] Email input missing `aria-required` and `autocomplete="email"` attribute
  Fix: Add `aria-required="true"` if the field is required, and `autocomplete="email"` for autofill support

- [page.html:14] Subscribe button has no visible focus style
  Fix: Using a real `<button>` will gain default focus styles; consider adding custom `:focus-visible` styles

### Summary
- 5 critical, 5 serious, 3 moderate, 3 minor issues found
- Estimated WCAG 2.1 AA compliance: Non-compliant. Multiple critical barriers exist for keyboard-only users and screen reader users. The page lacks fundamental accessibility structure (lang, landmarks, headings, labels, alt text, keyboard access).

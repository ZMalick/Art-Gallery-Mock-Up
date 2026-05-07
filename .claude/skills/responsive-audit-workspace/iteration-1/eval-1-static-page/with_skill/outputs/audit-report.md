## Responsive Audit Results

### Critical (breaks layout)
- [inline:1] **Fixed-width container** (`width: 960px`) — Causes horizontal scrolling on any screen narrower than 960px. → Change to `max-width: 960px; width: 100%;`
- [inline:5] **Fixed-width main column** (`width: 640px`) — Overflows on mobile and tablets. → Change to `flex: 1; min-width: 0;`
- [inline:8] **Fixed-width image** (`width: 640px`) — Image overflows container on small screens. → Change to `max-width: 100%; height: auto;`
- [inline:6] **Fixed-width sidebar** (`width: 280px`) — Two-column layout does not stack on mobile. → Use `flex-wrap: wrap` on parent, make sidebar full-width on small screens via media query or fluid sizing.
- [inline:1] **No media queries or breakpoints** — The page has zero breakpoints. Layout will not adapt to mobile (< 640px), tablet (640-1024px), or desktop (> 1024px). → Add media queries to stack columns and adjust spacing.

### Warning (degrades experience)
- [inline:7] **Body text font-size too small** (`14px`) — Below the recommended 16px minimum for comfortable mobile reading. → Change to `1rem` (16px).
- [inline:7] **Line-height too tight** (`1.2`) — Makes body text harder to read, especially on mobile. → Increase to at least `1.5`.
- [inline:9] **Touch target too small** — Button padding (`5px 8px`) and font-size (`11px`) result in a tap target well below the 44x44px WCAG 2.5.8 minimum. → Increase padding to at least `12px 24px` and font-size to `1rem`.
- [inline:3] **Navigation links lack sufficient tap target size** — Plain `<a>` tags without padding are difficult to tap on mobile (below 44x44px). → Add padding (`12px 16px`) and set `display: inline-block`.
- [inline:7] **No max-width on text** — Paragraph text can stretch across very wide screens, exceeding ~75 characters per line. → Add `max-width: 65ch` on the paragraph or container.

### Suggestion (enhancement)
- [inline:6] **Use `clamp()` for heading typography** — `font-size: 42px` is static. → Use `font-size: clamp(1.75rem, 4vw, 2.625rem)` for fluid scaling.
- [inline:1] **Use `rem` for spacing** — `gap: 20px`, `gap: 30px` use fixed `px`. → Use `rem` units (e.g., `1.25rem`, `1.875rem`) for better scaling with user preferences.
- [inline:1] **Missing `box-sizing: border-box`** — Not declared, which can cause unexpected sizing. → Add `*, *::before, *::after { box-sizing: border-box; }`.
- [inline:8] **Image missing `srcset`/`sizes`** — No resolution switching for different devices. → Add `srcset` and `sizes` attributes for optimized image loading.

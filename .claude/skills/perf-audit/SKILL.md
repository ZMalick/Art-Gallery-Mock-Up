---
name: perf-audit
description: "Analyze web application performance including bundle size, rendering, and runtime efficiency, then suggest optimizations. Use this skill when the user has a slow website, wants to improve load times, reduce bundle size, optimize rendering, fix performance bottlenecks, or needs a performance review. Triggers on: performance, slow page, bundle size, load time, lighthouse, Core Web Vitals, lazy loading, code splitting, optimization, rendering performance, memory leak, FCP, LCP, CLS, TTI."
---

# Performance Audit

Analyze web application code for performance issues and generate optimizations.

## Audit Process

1. **Read project files** — package.json, webpack/vite config, entry points, key components
2. **Analyze across categories** below
3. **Report findings** with estimated impact
4. **Apply fixes** with user approval

## Audit Categories

### Bundle Size

**Check for:**
- Large dependencies that have smaller alternatives:
  - `moment` -> `date-fns` or `dayjs`
  - `lodash` (full) -> `lodash-es` with tree-shaking or individual imports
  - `axios` -> native `fetch` (if no interceptors/cancellation needed)
- Dependencies imported but barely used
- Missing tree-shaking (CommonJS imports in ES module projects)
- No code splitting — entire app in one bundle

**Fixes:**
- Replace heavy dependencies with lighter alternatives
- Use dynamic `import()` for route-level code splitting
- Ensure ESM imports for tree-shakeable packages
- Analyze with `npx vite-bundle-visualizer` or `npx webpack-bundle-analyzer`

### Loading Performance

**Check for:**
- Images without `loading="lazy"` (below the fold)
- Images without proper sizing (`width`/`height` attributes cause CLS)
- No image optimization (suggest `next/image`, `sharp`, or `<picture>` with WebP/AVIF)
- Render-blocking CSS/JS in `<head>`
- Missing `<link rel="preload">` for critical resources
- Missing `<link rel="preconnect">` for third-party origins
- Fonts loaded without `font-display: swap`
- Large inline scripts/styles

**Fixes:**
- Add lazy loading to below-fold images
- Add width/height or aspect-ratio to images
- Preload critical fonts and above-fold images
- Defer non-critical JS with `defer` or `async`
- Inline critical CSS, defer the rest

### Rendering Performance (React/Vue/Svelte)

**Check for:**
- Components re-rendering unnecessarily (missing `React.memo`, `useMemo`, `useCallback`)
- Expensive computations in render path (should be memoized)
- Large lists without virtualization (>100 items — suggest `react-window` or `@tanstack/virtual`)
- State stored too high in the tree (causes subtree re-renders)
- Inline object/array/function creation in JSX props (new reference each render)

**Fixes:**
- Memoize expensive components and computations
- Move state closer to where it's used
- Virtualize long lists
- Extract stable references for callbacks and objects

### Network

**Check for:**
- No data caching strategy (React Query, SWR, Apollo cache)
- Waterfall requests that could be parallelized
- Missing request deduplication
- No pagination/infinite scroll on large datasets
- Over-fetching (fetching all fields when only a few are needed)

### CSS Performance

**Check for:**
- Extremely large CSS files (>50KB)
- Unused CSS (suggest PurgeCSS/Tailwind's purge)
- Complex selectors that cause layout thrashing
- Excessive use of `box-shadow`, `filter`, `backdrop-filter` without `will-change`
- Animations not using `transform`/`opacity` (triggers layout/paint)

## Report Format

```
## Performance Audit Results

### High Impact
- [file:line] Issue → Fix (estimated improvement)

### Medium Impact
- [file:line] Issue → Fix

### Low Impact / Quick Wins
- [file:line] Issue → Fix

### Metrics to Monitor
- LCP (Largest Contentful Paint): target < 2.5s
- FID (First Input Delay): target < 100ms
- CLS (Cumulative Layout Shift): target < 0.1
- TTFB (Time to First Byte): target < 800ms
```

## Static Site (No Build Tools) — Kay's Originals

When auditing a vanilla HTML/CSS/JS site (no webpack, no npm, no framework), skip bundle-size and React-specific checks. Focus on these instead:

### Image Optimization
- Images without `loading="lazy"` (below-the-fold artwork images, artist photos)
- Missing `width`/`height` attributes causing CLS
- Large images served without responsive `srcset` — suggest `<picture>` with WebP
- Artwork thumbnails vs. large images: `image` (card) should be smaller than `imageLg` (lightbox)

### Font Loading
- Google Fonts loaded without `font-display: swap` → causes FOIT
- Missing `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Missing `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
- Consider self-hosting fonts for faster load

### Scroll Performance
- Scroll listeners without `{ passive: true }` — flag as High Impact
- `IntersectionObserver` used correctly for scroll reveal (good pattern)
- No `will-change` on animated elements (transform/opacity transitions)

### Script Loading
- `<script>` tags without `defer` blocking page render
- Large inline `<script>` blocks that could be external files
- `data.js` size — if artwork data grows large, consider lazy loading

### CSS Performance
- `transition: all` anywhere → forces browser to check every property (High Impact)
- Large CSS file (>50KB) — consider splitting critical above-fold CSS
- Complex selectors with deep nesting
- Unused CSS rules (common in single-stylesheet sites)

### Kay's-Specific Checks
| Check | File | What to Look For |
|-------|------|-----------------|
| Hero slideshow preload | `index.html` | First slide image should have `<link rel="preload">` |
| Gallery image lazy loading | `js/main.js` | JS-generated `<img>` tags should include `loading="lazy"` |
| Passive scroll listeners | `js/main.js` | All `addEventListener('scroll', ...)` must have `{ passive: true }` |
| Font display swap | All HTML | Google Fonts `<link>` should include `&display=swap` |
| Preconnect hints | All HTML | `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` |

## Applying Fixes

Prioritize high-impact, low-effort fixes first. Don't introduce new dependencies unless the performance gain is significant. Keep changes minimal and targeted — performance optimization should not become a refactor.

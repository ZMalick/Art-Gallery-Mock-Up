---
name: responsive-audit
description: "Analyze web pages and components for responsive design issues and auto-fix them. Use this skill when the user mentions responsive problems, mobile layout issues, breakpoint bugs, pages not looking right on phones/tablets, elements overflowing on small screens, or needs a responsive design review. Triggers on: responsive, mobile layout, breakpoints, media queries, viewport issues, overflow, mobile-friendly, tablet view, screen size."
---

# Responsive Design Audit

Analyze HTML/CSS/JSX files for responsive design issues and generate fixes.

## Audit Process

1. **Read the target files** — the component, page, or layout the user wants audited
2. **Identify issues** across these categories
3. **Report findings** in a structured format
4. **Apply fixes** directly to the code

## Issue Categories

### Layout Issues
- Fixed widths that should be fluid (`width: 500px` on containers)
- Missing `max-width` on content containers
- Flexbox/Grid layouts that don't wrap on small screens
- Absolute positioning that breaks at different viewports
- Horizontal overflow causing scrollbars

### Typography
- Font sizes too small on mobile (body text below 16px)
- Line lengths exceeding ~75 characters on wide screens (missing `max-width` on text)
- No responsive type scaling (consider `clamp()` for fluid typography)

### Touch Targets
- Interactive elements smaller than 44x44px (WCAG 2.5.8)
- Insufficient spacing between tap targets (at least 8px gap)
- Hover-only interactions with no touch alternative

### Images & Media
- Images without `max-width: 100%` or missing responsive attributes
- Missing `srcset`/`sizes` for resolution switching
- Videos/embeds without responsive wrappers (`aspect-ratio` or padding trick)

### Breakpoint Strategy
- No media queries at all
- Breakpoints that don't cover common ranges:
  - Mobile: < 640px
  - Tablet: 640px - 1023px
  - Desktop: > 1023px
- Breakpoints based on device widths instead of content needs

### CSS Issues
- Using `px` for spacing/sizing where `rem`/`em` would be better
- Missing `box-sizing: border-box`
- `overflow: hidden` masking layout problems instead of fixing them

## Report Format

Present findings as:

```
## Responsive Audit Results

### Critical (breaks layout)
- [file:line] Description of issue → Suggested fix

### Warning (degrades experience)
- [file:line] Description of issue → Suggested fix

### Suggestion (enhancement)
- [file:line] Description of issue → Suggested fix
```

## Applying Fixes

After presenting the report, ask the user if they want all fixes applied, or let them pick which ones. When applying:
- Use `clamp()` for fluid typography where appropriate
- Use CSS Grid or Flexbox with proper wrapping
- Add media queries at content-appropriate breakpoints
- Ensure images are fluid with `max-width: 100%; height: auto;`
- Set minimum touch target sizes
- Use relative units (`rem`, `em`, `%`, `vw`) over fixed `px` where appropriate

Do not restructure the user's CSS architecture — make targeted fixes within their existing approach.

## Kay's Originals — Site-Specific Checks

When auditing this project, also check these components at both breakpoints (1023px and 640px):

| Component | What to Check |
|-----------|---------------|
| Gallery grid | Cards reflow from 3-col → 2-col → 1-col; no overflow; images scale |
| Hero slideshow | Image covers viewport width; text remains readable; no horizontal scroll |
| Artist cards | Grid adapts; photos don't distort; names don't truncate |
| Hamburger menu | Appears at ≤1023px; nav links hidden on desktop; menu panel doesn't overflow |
| Lightbox | Image fits viewport on mobile; close button reachable; no scroll lock issues |
| Filter bar (gallery) | Buttons wrap on mobile; search input full-width on small screens |
| Footer | Columns stack vertically on mobile; links remain tappable |
| Color bar | Spans full width at all sizes; doesn't cause horizontal scroll |
| Contact form | Inputs full-width on mobile; labels visible; submit button reachable |
| Artwork detail | Image + info layout stacks vertically on mobile |

### Project Breakpoints
- **Tablet**: `max-width: 1023px` (NOT 1024px)
- **Mobile**: `max-width: 640px`
- **Hamburger trigger**: 1024px (CSS uses `max-width: 1023px` to hide nav links)

### Kay's CSS Rules
- No framework classes (Tailwind, Bootstrap)
- Only `transform` and `opacity` transitions — never `transition: all`
- Use CSS custom properties from `:root`, not hardcoded values

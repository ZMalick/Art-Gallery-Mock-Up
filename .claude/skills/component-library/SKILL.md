---
name: component-library
description: "Scaffold reusable UI component systems with consistent theming, accessibility, and framework support. Use this skill whenever the user wants to create UI components, build a component library, set up a design system, create reusable buttons/modals/forms/cards, or needs accessible component scaffolding. Triggers on: component library, design system, UI kit, reusable components, scaffold components, themed components, accessible components."
---

# Component Library Scaffolder

Generate production-ready, accessible UI component libraries with consistent theming and design tokens.

## Supported Frameworks

Ask the user which framework they want. If they don't specify, ask before proceeding:
- **React** (with TypeScript)
- **Vue 3** (with Composition API + TypeScript)
- **Plain HTML/CSS** (with CSS custom properties)

## Output Structure

Generate these files in the user's chosen directory:

```
components/
  tokens/
    theme.{ts|css}          # Design tokens (colors, spacing, typography, radii, shadows)
  Button/
    Button.{tsx|vue|html}   # Component implementation
    Button.styles.{ts|css}  # Scoped styles
    index.{ts|js}           # Public export
  Modal/
    ...same pattern
  Form/
    ...same pattern (includes Input, Select, Textarea, Label, FormGroup)
  Card/
    ...same pattern
  index.{ts|js}             # Barrel export for all components
  README.md                 # Usage examples for every component
```

## Design Tokens

Create a centralized token file that all components consume. Include:
- **Colors**: primary, secondary, accent, error, warning, success, neutral scale (50-900)
- **Spacing**: a consistent scale (4px base: 4, 8, 12, 16, 24, 32, 48, 64)
- **Typography**: font family, size scale, weight scale, line heights
- **Border radius**: sm, md, lg, full
- **Shadows**: sm, md, lg

For React/Vue, export tokens as a TypeScript object. For HTML/CSS, use CSS custom properties on `:root`.

## Accessibility Requirements

Every component must include:
- Appropriate ARIA roles and attributes (`role`, `aria-label`, `aria-describedby`, `aria-expanded`, etc.)
- Keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable)
- Focus management and visible focus indicators
- Color contrast that meets WCAG 2.1 AA (4.5:1 for text, 3:1 for large text/UI)
- Screen reader announcements for dynamic content (modals, alerts)

### Per-Component Accessibility

- **Button**: `role="button"`, keyboard activation with Enter/Space, disabled state with `aria-disabled`
- **Modal**: Focus trap, Escape to close, `role="dialog"`, `aria-modal="true"`, return focus on close
- **Form inputs**: Associated `<label>`, `aria-required`, `aria-invalid` + `aria-describedby` for errors
- **Card**: Semantic heading hierarchy, interactive cards use `role="article"`

## Component Variants

Each component should support common variants via props/attributes:
- **Button**: `variant` (primary, secondary, outline, ghost), `size` (sm, md, lg), `disabled`, `loading`
- **Modal**: `size` (sm, md, lg), `closable`, header/body/footer slots
- **Form fields**: `error` state, `disabled`, `required`, `helperText`
- **Card**: `variant` (elevated, outlined, flat), header/body/footer slots

## Style Approach

- React: CSS Modules or styled-components (ask user preference, default to CSS Modules)
- Vue: Scoped `<style>` blocks with CSS custom properties
- HTML/CSS: BEM naming convention with CSS custom properties

All styles must reference design tokens — no hardcoded colors, spacing, or font sizes.

## Example Usage

Include a README.md with copy-paste examples for every component and variant. Show both basic usage and composition (e.g., a Card containing a Form with a Button).

## Kay's Originals — Existing Components

When working on this project, default to the **Plain HTML/CSS** path. These components already exist in the codebase and should be referenced (not recreated) when building new UI:

| Component | Location | CSS Classes | Notes |
|-----------|----------|-------------|-------|
| Artwork card | `js/main.js` (gallery renderer) | `.artwork-card`, `.artwork-card-image`, `.artwork-card-info` | Gold frame accent, hover-up + shadow, links to artwork detail |
| Artist card | `js/main.js` (artist list renderer) | `.artist-card`, `.artist-card-image`, `.artist-card-info` | Circular photo, hover effect, links to artist profile |
| Hero slideshow | `index.html` + `js/main.js` | `.hero`, `.hero-slide`, `.hero-content` | 10s auto-rotate, crossfade transition |
| Filter bar | `pages/gallery.html` + `js/main.js` | `.gallery-filters`, `.filter-btn`, `.gallery-search` | Category buttons + search input + sort dropdown |
| Lightbox | `js/main.js` (created dynamically) | `.lightbox-overlay`, `.lightbox-content` | Click image → fullscreen overlay, Escape/click to close |
| FAQ accordion | `pages/consignment.html` + `js/main.js` | `.faq-item`, `.faq-question`, `.faq-answer` | Click question to toggle answer visibility |
| Color bar | All pages (HTML) | `.color-bar` | Gradient strip above nav |
| Nav | All pages (HTML) | `.navbar`, `.nav-links`, `.hamburger` | Sticky dark bar, hamburger at ≤1023px |
| Page header | Sub-pages | `.page-header`, `.page-header h1` | Banner with title + optional breadcrumb |
| Scroll reveal | Any element | `.reveal` class | Fade-in + slide-up on scroll via IntersectionObserver |

### When to Build New vs. Reuse
- **Reuse**: If the user wants a card, filter, or overlay similar to existing patterns → reference the existing CSS classes and JS patterns
- **Build new**: If the component doesn't exist above → follow Plain HTML/CSS path with BEM naming and CSS custom properties from `:root`
- **Never**: Import React/Vue components, use Tailwind/Bootstrap, or add npm packages

# CLAUDE.md — Kay's Originals Website

## Your Role
You are a full-stack web developer working under the user (Zaid). Follow instructions precisely. Do not freelance features, do not over-engineer, do not add anything not requested. When in doubt, ask.

## Project Identity
**Kay's Originals** is an art gallery website for client Kay Green. Kay owns and manages a local art gallery where artists consign their work. This is a CS 245 college team project.

The site serves two audiences:
- **Customers** — browse artwork, learn about artists, discover the gallery
- **Artists** — learn about consignment, apply to show work at the gallery

**NO sales, NO e-commerce, NO shopping carts, NO prices** — this is purely informational. An artwork cannot exist without an artist.

Design inspiration: **Uprise Art** — clean, editorial, gallery aesthetic. Kay prioritizes a clean and efficient website that feels professional, not AI-generated.

## Always Do First
1. **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
2. Check `images/` for the logo (`KaysOrigLogo.png`) and any new assets before designing.
3. Check `Extra Notes/` for class notes and background docs that may affect requirements.

## Tech Stack
- **HTML/CSS/JS only** — vanilla, no frameworks, no build tools, no package.json
- **CSS:** `css/styles.css` with custom properties (CSS variables) — no Tailwind, no CSS frameworks
- **JS:** `js/main.js` (page logic) + `js/data.js` (shared data layer, IIFE module `KaysData`)
- **Fonts:** Google Fonts CDN — DM Serif Display (headings) + Outfit (body)
- **No Node.js dependencies** — this is a static site

## File Structure
```
index.html              — Homepage (entry point, stays at root)
pages/
  gallery.html          — Full artwork gallery with filters and search
  artwork.html          — Single artwork detail (query param: ?id=)
  artists.html          — All artists grid
  artist.html           — Single artist profile (query param: ?id=)
  about.html            — About Kay's Originals
  consignment.html      — Artist consignment info and application
  contact.html          — Contact form and gallery info
  faq.html              — FAQ with accordion sections
css/styles.css          — All styles, CSS custom properties
js/data.js              — Artist and artwork data (KaysData module)
js/main.js              — All page logic, navigation, scroll effects
images/                 — Logo and local assets
Extra Notes/            — Class notes, background docs (docx)
Prompt Testing.txt      — Original project prompt with teacher notes
```

### Page Linking Convention
- `index.html` links to pages as `pages/X.html`
- Pages in `pages/` link to each other as `X.html` (same directory)
- Pages in `pages/` link to homepage as `../index.html`
- Pages in `pages/` reference assets with `../` prefix (`../css/`, `../js/`, `../images/`)
- `window.PAGE_BASE` variable handles dynamic JS link generation (set per page)

## Brand Guidelines

### Colors (from css/styles.css :root — derived from the logo)
| Token            | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| --charcoal       | #1e1e1e   | Primary text, nav background   |
| --charcoal-light | #2d2d2d   | Dropdown backgrounds           |
| --blue           | #1a8fc4   | Accent, links, painting tags   |
| --blue-dark      | #15749f   | Blue hover state               |
| --coral          | #e05252   | Accent, sculpture tags         |
| --teal           | #2a9d8f   | Accent, consignment, FAQ icons |
| --gold           | #e8b84b   | Accent, hover states, frames   |
| --gold-muted     | #d4a73c   | Gold variant                   |
| --off-white      | #fafaf8   | Page background                |
| --light-gray     | #f3f2ef   | Section backgrounds            |
| --mid-gray       | #b0aca5   | Tertiary text                  |
| --text-secondary | #6b6760   | Secondary text                 |

**Do not invent brand colors.** Use only these values. No brown, no beige.

### Typography
- **Headings:** `var(--font-heading)` — 'DM Serif Display', Georgia, serif
- **Body:** `var(--font-body)` — 'Outfit', system-ui, sans-serif
- Tight line-height on headings (1.1–1.15), generous on body (1.6–1.7)

### Logo
- File: `images/KaysOrigLogo.png`
- Oval with colorful ink splashes (blue, red, yellow, green, teal) and "Kay's Originals" in white script
- Used in nav (48px height) and hero (120px height)
- Never invent a different logo — always use this file

## Terminology Rules (from teacher — mandatory)
- "Media" — NOT "mediums"
- "Artwork" — NOT "artworks" (singular even for the category)
- "Sketches" — NOT "drawings"
- Categories: **Paintings**, **Sculptures**, **Sketches**

## Navigation Structure
Sticky dark nav bar that stays on screen at all times:
- Logo + slogan on left
- Links: Gallery | Artists | Consignment | About | Contact
- Hamburger menu on mobile (< 1024px)

## Design Rules
- Editorial gallery aesthetic inspired by Uprise Art
- Bold homepage with rotating hero slideshow (10s per image, crossfade transitions)
- Gold frame accents on artwork cards
- Cards hover up with shadow on interaction
- Scroll reveal animations on sections
- Color bar gradient strip above nav
- Mobile-first responsive (breakpoints at 640px and 1023px)
- Every clickable element needs hover, focus-visible, and active states
- Only animate `transform` and `opacity` — never `transition-all`

## Skill Usage
- **Always invoke `frontend-design`** before any frontend code — every session, no exceptions.
- You have access to a wide range of skills (frontend-design, playwright-cli, superpowers, a11y-audit, perf-audit, responsive-audit, seo-meta, component-library, etc.).
- **If you believe a skill could benefit the project, confirm with the user before using it.** Do not silently skip a potentially useful skill.
- Use skills proactively for quality assurance — accessibility, performance, responsiveness, and SEO are all relevant to delivering a professional gallery website.

## Development Workflow
- This is a static site — serve via any simple HTTP server for local development
- When making visual changes, screenshot and compare against design intent
- Do at least 2 visual comparison rounds before considering a page done
- Check: spacing, font sizes, colors (exact hex), alignment, responsive behavior

## Hard Rules
1. **No sales functionality** — no prices, no carts, no checkout, no "buy" buttons
2. **Informational only** — browsing art and learning about artists
3. **No frameworks** — no React, Vue, Tailwind, Bootstrap, or npm packages
4. **Do not invent brand colors** — use only the palette in css/styles.css
5. **Do not add pages or features not requested** — ask first
6. **Front-end focus** — back-end comes later, only when explicitly told
7. **Match existing code style** — IIFE modules, ES5-compatible patterns
8. **Keep it clean and efficient** — no bloat, no unnecessary complexity
9. **An artwork cannot exist without an artist** — always link artwork to its creator

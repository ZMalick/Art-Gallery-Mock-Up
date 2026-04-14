# CLAUDE.md — Kay's Originals Website

## Your Role
You are a full-stack web developer working under Zaid. Follow instructions precisely. Do not freelance features, do not over-engineer, do not add anything not requested. When in doubt, ask.

## Project Identity
**Kay's Originals** is an art gallery website for client Kay Green — a local art gallery where artists consign their work. CS 245 college team project.

Two audiences:
- **Customers** — browse artwork, learn about artists, discover the gallery
- **Artists** — learn about consignment, apply to show work

**NO sales, NO e-commerce, NO shopping carts, NO prices** — purely informational. An artwork cannot exist without an artist.

Design inspiration: **Uprise Art** — clean, editorial, gallery aesthetic. Professional, not AI-generated.

## Always Do First
1. Check `images/` for the logo (`KaysOrigLogo.png`) and any new assets before designing.
2. Check `Extra Notes/` for class notes and background docs that may affect requirements.
3. **Read `docs/lessons-learned.md`** before starting any complex or multi-file task — it contains known patterns and resolved gotchas. Add a new entry when you discover something non-obvious or the user corrects a mistake.

## Tech Stack
- **HTML/CSS/JS only** — vanilla, no frameworks, no build tools, no package.json
- **CSS:** `css/styles.css` with CSS custom properties — no Tailwind, no CSS frameworks
- **JS:** `js/main.js` (page logic) + `js/data.js` (shared data layer, IIFE module `KaysData`)
- **Fonts:** Google Fonts CDN — DM Serif Display (headings) + Outfit (body)
- **No Node.js dependencies** — static site

## Page Linking Convention
- `index.html` links to pages as `pages/X.html`
- Pages in `pages/` link to each other as `X.html` (same directory)
- Pages in `pages/` link to homepage as `../index.html`
- Pages in `pages/` reference assets with `../` prefix (`../css/`, `../js/`, `../images/`)
- `window.PAGE_BASE` variable handles dynamic JS link generation (set per page)

## Brand Guidelines
- **Colors:** All CSS custom properties are defined in `css/styles.css :root`. **Do not invent colors** — use only those variables. No brown, no beige.
- **Headings:** `var(--font-heading)` — DM Serif Display, tight line-height (1.1–1.15)
- **Body:** `var(--font-body)` — Outfit, generous line-height (1.6–1.7)
- **Logo:** `images/KaysOrigLogo.png` — oval with colorful ink splashes. Never invent a different logo.

## Terminology Rules (from teacher — mandatory)
- "Media" — NOT "mediums"
- "Artwork" — NOT "artworks"
- "Sketches" — NOT "drawings"
- Categories: **Paintings**, **Sculptures**, **Sketches**

## Navigation
Sticky dark nav, always visible:
- Logo + slogan on left
- Links: Gallery | Artists | Consignment | About | Contact
- Hamburger menu on mobile (< 1024px)

## Design Rules
- Editorial gallery aesthetic (Uprise Art)
- Bold homepage with rotating hero slideshow (10s per image, crossfade)
- Gold frame accents on artwork cards
- Cards hover up with shadow
- Scroll reveal animations
- Color bar gradient strip above nav
- Mobile-first responsive (breakpoints: 640px, 1023px)
- Every clickable element needs hover, focus-visible, and active states
- Only animate `transform` and `opacity` — never `transition-all`

## Skill Usage
- Invoke `frontend-design` skill when writing new frontend code or doing significant UI work.
- Invoke `superpowers:brainstorming` before building new features or components.
- Backend skills (`rest-api`, `auth-setup`, `database-design`, `docker-setup`, `env-config`, `ci-cd`) are **out of scope** — ask before using.
- If you think a QA skill (`a11y-audit`, `responsive-audit`, `perf-audit`, `seo-meta`) would benefit the work, confirm with the user first.

## Development Workflow
- Visual changes: screenshot at 1280 AND 900 widths, compare against design intent; if a CSS fix doesn't show up, grep the selector globally — duplicate/stale rules are the usual cause
- Large QA passes (10+ items): group into 5-10 batches, implement one at a time, wait for explicit user approval before moving on

## Hard Rules
1. **No sales functionality** — no prices, no carts, no checkout, no "buy" buttons
2. **Informational only** — browsing art and learning about artists
3. **No frameworks** — no React, Vue, Tailwind, Bootstrap, or npm packages
4. **Do not invent brand colors** — use only the palette in `css/styles.css`
5. **Do not add pages or features not requested** — ask first
6. **Front-end focus** — back-end comes later, only when explicitly told
7. **Match existing code style** — IIFE modules, ES5-compatible patterns
8. **Keep it clean and efficient** — no bloat, no unnecessary complexity
9. **An artwork cannot exist without an artist** — always link artwork to its creator
10. **Keep this file at or under 85 lines** when possible; 130 lines is the absolute cap — compress existing content before expanding

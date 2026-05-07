# Kay's Originals — Art Gallery Website

A mock art gallery website built for **CS 245: Working in a Team Environment**. Kay's Originals is a curated gallery in Austin, TX representing a mix of contemporary artists (consignment) and historical Permanent Collection pieces.

## Live Preview

Open `index.html` in a modern browser, or run a local server from the project root:

```
python -m http.server 8765
```

Then visit `http://localhost:8765/index.html`.

## Project Structure

```
Kay's Originals Website/
├── index.html              # Homepage
├── pages/                  # All other pages
│   ├── 404.html
│   ├── about.html
│   ├── artist-login.html
│   ├── artist-signup.html
│   ├── artist.html         # Artist detail (?id=<lastname>)
│   ├── artists.html        # Artists listing
│   ├── artwork.html        # Artwork detail (?id=<slug>)
│   ├── consignment.html    # "For Artists" page
│   ├── contact.html
│   ├── exhibition.html     # Exhibition detail (?id=<slug>)
│   ├── exhibitions.html    # Exhibitions listing
│   ├── faq.html
│   └── gallery.html        # "Artwork" listing
├── css/
│   └── styles.css          # All styles, CSS custom properties
├── js/
│   ├── main.js             # Page logic, dynamic rendering, animations
│   └── data.js             # Shared data layer (IIFE module KaysData)
├── images/                 # Logo, artwork images, artist portraits
├── docs/                   # Documentation, plans, lessons-learned, known-issues
├── CLAUDE.md               # AI assistant onboarding
└── README.md
```

## Features

- **Sticky Navigation** with Artwork dropdown (Paintings / Sculptures / Sketches), responsive hamburger on mobile
- **Hero Section** on homepage with featured artwork callout + gallery photo + Google Maps link
- **Gallery** with filter pills (All / Paintings / Sculptures / Sketches) + filter by artist + decade; 21 pieces
- **Artists** listing (10 artists) with detail pages showing bio, works, exhibitions
- **Artwork Detail** pages with full description, medium, dimensions, related works, price (contemporary only)
- **Exhibitions** listing + detail pages with featured artwork and participating artists
- **For Artists / Consignment** flow: info → application form (artist-signup.html)
- **Artist Login** page (UI-only, no backend)
- **Contact** with separate forms for customers vs artists
- **FAQ** with collapsible questions for visitors and artists
- **404** page with return-to-gallery CTA

## Design

- **Typography**: DM Serif Display (headings) + Outfit (body) via Google Fonts
- **Color Palette**: CSS custom properties in `css/styles.css :root` — Deep Charcoal, Vivid Blue, Coral Red, Teal Green, Warm Gold
- **Responsive**: Desktop, tablet (≤1023px), mobile (≤640px) breakpoints
- **Animations**: Scroll-reveal fade-ins; transform + opacity only

## Tech Stack

- HTML5, CSS3, vanilla JavaScript — no frameworks, no build tools, no Node dependencies
- IIFE module pattern for data layer (`js/data.js` exports `window.KaysData`)
- `window.PAGE_BASE` and `window.IMAGE_BASE` for cross-folder asset resolution (see `docs/lessons-learned.md`)

## Team

Built for client Kay Green as a class project in CS 245.
- Zaid Malick
- Summer Marfani
- Luke Paniagua
- Gabriel Reyes Ramos
- Joseph Lercara

## Documentation

- [`CLAUDE.md`](CLAUDE.md) — onboarding for AI assistants (project conventions, hard rules)
- [`docs/status.md`](docs/status.md) — current project status and open questions
- [`docs/lessons-learned.md`](docs/lessons-learned.md) — known patterns and gotchas
- [`docs/known-issues.md`](docs/known-issues.md) — bug punch list with severity + suggested fixes

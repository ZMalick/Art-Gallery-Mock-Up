# Agent Flags

Issues the testing agent has identified during Playwright test runs. These are things that need fixing or monitoring. When an issue is resolved, move it to `resolved.md`.

---

## Open Issues

_No open issues yet. Add entries here as the testing agent finds problems._

---

## How to Add an Entry

```markdown
### [Page] — [Date]
**Observed:** Specific description of the problem (what was seen, not just "it looked bad")
**Viewport:** Desktop (1280x720) | Mobile (390x844) | Both
**Reproducible:** Yes | Intermittent
**Severity:** Visual / Functional / Critical
**Suggested fix:** Optional — what would likely resolve this
**Status:** Open
```

---

## Patterns to Watch For (standing checklist)

Every test run, check these known problem areas:

### Layout & Visual
- [ ] Section backgrounds alternate (no two `--light-gray` sections adjacent)
- [ ] Sub-page heroes are clean — no gold lines or heavy gradients
- [ ] Nav is sticky and visible at all scroll positions
- [ ] No horizontal scroll on mobile
- [ ] Scroll reveal animations fire without layout shift
- [ ] Hover/focus states visible on all interactive elements

### Responsive Viewports
Test at these three sizes — they map directly to the site's CSS breakpoints:

**Mobile — 390px wide (below 640px breakpoint)**
- [ ] Nav collapses to hamburger button (no horizontal nav links visible)
- [ ] Hamburger opens/closes the menu correctly
- [ ] Cards stack vertically (no multi-column grid)
- [ ] Hero text and images scale without overflow
- [ ] No text truncated or cut off
- [ ] Footer stacks cleanly

**Tablet — 768px wide (between 640px and 1023px breakpoints)**
- [ ] Nav still shows hamburger (hamburger triggers at 1024px)
- [ ] Cards may show 2-column layout depending on page
- [ ] No elements overflow their containers

**Desktop — 1280px wide (above 1023px breakpoint)**
- [ ] Full horizontal nav visible (no hamburger)
- [ ] Cards show full multi-column grid layout
- [ ] Hero fills viewport width correctly
- [ ] Sidebar/filter columns display if present

### Brand & Content
- [ ] Text says "Media" — NOT "mediums"
- [ ] Text says "Artwork" — NOT "artworks" (singular for the category)
- [ ] Text says "Sketches" — NOT "drawings"
- [ ] Category tags: only Paintings, Sculptures, Sketches — no other categories
- [ ] No prices, no "buy" buttons, no e-commerce elements anywhere
- [ ] Logo (`KaysOrigLogo.png`) present in nav on every page

### Navigation & Links
- [ ] Mobile hamburger menu opens and closes correctly
- [ ] All artwork cards link to correct `artwork.html?id=` pages
- [ ] All artist cards link to correct `artist.html?id=` pages
- [ ] No broken images (check `../images/` path prefixes for pages in `pages/`)
- [ ] CSS custom properties load (check `--charcoal`, `--blue`, etc. render correctly)

### Per-Page Checks

**index.html (Homepage)**
- [ ] Hero slideshow cycles through images (10s per image, crossfade)
- [ ] Featured artwork section visible

**pages/gallery.html**
- [ ] Artwork grid renders correctly
- [ ] Filter/search controls present and functional (when implemented)
- [ ] Artwork category tags use correct brand colors (blue=Paintings, coral=Sculptures)

**pages/artists.html**
- [ ] Artist grid renders correctly
- [ ] Search bar functional (when implemented)
- [ ] Art-type filter functional (when implemented)

**pages/artwork.html**
- [ ] Query param `?id=` loads correct artwork
- [ ] Artist credit link works (links back to `artist.html?id=`)
- [ ] No artwork shown without a linked artist

**pages/artist.html**
- [ ] Query param `?id=` loads correct artist profile
- [ ] Artist's artworks displayed on their profile

**pages/about.html**
- [ ] All sections visible and separated visually

**pages/consignment.html**
- [ ] Application form/info present
- [ ] No pricing or e-commerce language

**pages/contact.html**
- [ ] Contact form renders
- [ ] Gallery info (address, hours) visible

**pages/faq.html**
- [ ] Accordion sections open and close correctly

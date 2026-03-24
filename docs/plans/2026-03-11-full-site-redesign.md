# Kay's Originals Full Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform single-page art gallery into a multi-page informational website with clean light/dark mix aesthetic, serving both customers browsing art and artists interested in consignment.

**Architecture:** Static vanilla HTML/CSS/JS site. Shared data layer in `js/data.js` drives all artwork/artist content across pages. Each page is a standalone HTML file sharing `css/styles.css` and `js/main.js`. No frameworks, no build tools.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JS (ES5 IIFE pattern matching existing code), Google Fonts (DM Serif Display + Outfit), Unsplash images.

**Design:** Dark nav/footer (charcoal), light content areas (off-white/white), colors derived from logo (blue, teal, coral, gold, green). Clean, simple, editorial. Strictly informational — no sales/pricing.

---

## File Structure

```
Kay's Originals Website/
├── index.html              (MODIFY - redesign homepage)
├── gallery.html            (CREATE - browse all artwork with filters)
├── artwork.html            (CREATE - single artwork detail, driven by URL params)
├── artists.html            (CREATE - browse all artists)
├── artist.html             (CREATE - single artist profile, driven by URL params)
├── about.html              (CREATE - Kay's story)
├── consignment.html        (CREATE - how consignment works + apply)
├── contact.html            (CREATE - contact form + gallery info)
├── faq.html                (CREATE - accordion Q&A)
├── css/
│   └── styles.css          (MODIFY - add new page styles, refine existing)
├── js/
│   ├── data.js             (CREATE - shared artwork/artist data)
│   └── main.js             (MODIFY - add page-specific JS, gallery filters, FAQ accordion)
└── images/
    └── KaysOrigLogo.png    (existing)
```

---

## Chunk 1: Shared Foundation

### Task 1: Create shared data layer (`js/data.js`)

**Files:**
- Create: `js/data.js`

All artwork and artist data lives here so every page can render from the same source.

- [ ] **Step 1: Create `js/data.js` with artwork and artist arrays**

```js
/* Kay's Originals — Shared Data */
var KaysData = (function () {

  var artists = [
    {
      id: 'picasso',
      name: 'Pablo Picasso',
      media: 'Painting & Sculpture',
      photo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
      bio: 'Spanish painter and sculptor, co-founder of Cubism and one of the most influential artists of the 20th century. His revolutionary approach to form and perspective transformed modern art.',
      shortBio: 'Pioneer of Cubism and one of the most influential artists of the 20th century.'
    },
    {
      id: 'kahlo',
      name: 'Frida Kahlo',
      media: 'Painting',
      photo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
      bio: 'Mexican artist celebrated for her vivid self-portraits and works inspired by the nature and culture of Mexico. Her paintings blend realism with fantasy, drawing on folk art traditions and personal experience.',
      shortBio: 'Known for vivid self-portraits and works inspired by Mexican folk art and surrealism.'
    },
    {
      id: 'monet',
      name: 'Claude Monet',
      media: 'Painting',
      photo: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=400&fit=crop',
      bio: 'Founder of French Impressionism, Monet devoted his career to capturing light and atmosphere through plein air painting. His Water Lilies series remains among the most beloved works in art history.',
      shortBio: 'Founder of Impressionism, celebrated for capturing light and atmosphere in nature.'
    },
    {
      id: 'vangogh',
      name: 'Vincent van Gogh',
      media: 'Painting',
      photo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
      bio: 'Dutch Post-Impressionist painter whose bold colors and emotional honesty influenced countless artists. Despite a short career, he created over 2,100 artworks including some of the most recognizable paintings in the world.',
      shortBio: 'Post-Impressionist master known for bold colors and emotional intensity.'
    },
    {
      id: 'davinci',
      name: 'Leonardo da Vinci',
      media: 'Painting & Sketching',
      photo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
      bio: 'Italian Renaissance polymath whose notebooks reveal a mind that bridged art and science. His meticulous studies of anatomy, light, and nature informed paintings that set new standards for realism and composition.',
      shortBio: 'Renaissance master whose art bridged the worlds of science and beauty.'
    },
    {
      id: 'rodin',
      name: 'Auguste Rodin',
      media: 'Sculpture',
      photo: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=400&fit=crop',
      bio: 'French sculptor regarded as the father of modern sculpture. Rodin broke with decorative tradition to create deeply expressive works that capture the human condition with unprecedented emotional power.',
      shortBio: 'Father of modern sculpture, known for deeply expressive bronze works.'
    }
  ];

  var artworks = [
    {
      id: 'starry-night',
      title: 'The Starry Night',
      artistId: 'vangogh',
      category: 'painting',
      year: '1889',
      medium: 'Oil on canvas',
      dimensions: '73.7 cm × 92.1 cm',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1000&h=800&fit=crop',
      description: 'A swirling night sky over a village, painted during Van Gogh\'s stay at the asylum in Saint-Rémy-de-Provence. The painting\'s dynamic composition and bold color choices make it one of the most recognized works in Western art.'
    },
    {
      id: 'water-lilies',
      title: 'Water Lilies',
      artistId: 'monet',
      category: 'painting',
      year: '1906',
      medium: 'Oil on canvas',
      dimensions: '89.9 cm × 94.1 cm',
      image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=1000&h=800&fit=crop',
      description: 'Part of Monet\'s celebrated series depicting his flower garden at Giverny. These paintings capture the interplay of light, water, and reflection in an almost abstract meditation on nature.'
    },
    {
      id: 'the-thinker',
      title: 'The Thinker',
      artistId: 'rodin',
      category: 'sculpture',
      year: '1904',
      medium: 'Bronze',
      dimensions: '189 cm × 98 cm × 140 cm',
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1000&h=800&fit=crop',
      description: 'Originally conceived as part of The Gates of Hell, this iconic bronze sculpture depicts a man in deep contemplation. It has become a universal symbol of philosophical thought.'
    },
    {
      id: 'self-portrait-thorn',
      title: 'Self-Portrait with Thorn Necklace',
      artistId: 'kahlo',
      category: 'painting',
      year: '1940',
      medium: 'Oil on canvas',
      dimensions: '63.5 cm × 49.5 cm',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&h=800&fit=crop',
      description: 'One of Kahlo\'s most iconic self-portraits, featuring a thorn necklace with a hummingbird pendant. The work blends personal symbolism with Mexican folk art traditions.'
    },
    {
      id: 'vitruvian-man',
      title: 'Vitruvian Man',
      artistId: 'davinci',
      category: 'sketch',
      year: 'c. 1490',
      medium: 'Ink on paper',
      dimensions: '34.6 cm × 25.5 cm',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&h=800&fit=crop',
      description: 'A study of ideal human proportions based on the writings of ancient Roman architect Vitruvius. This drawing exemplifies Leonardo\'s belief in the connection between art and science.'
    },
    {
      id: 'les-demoiselles',
      title: 'Les Demoiselles d\'Avignon',
      artistId: 'picasso',
      category: 'painting',
      year: '1907',
      medium: 'Oil on canvas',
      dimensions: '243.9 cm × 233.7 cm',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1000&h=800&fit=crop',
      description: 'A revolutionary painting that broke with traditional composition and perspective. This proto-Cubist work shocked the art world and opened the door to radical new approaches to form.'
    },
    {
      id: 'guernica',
      title: 'Guernica',
      artistId: 'picasso',
      category: 'painting',
      year: '1937',
      medium: 'Oil on canvas',
      dimensions: '349.3 cm × 776.6 cm',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1000&h=600&fit=crop',
      description: 'Picasso\'s powerful anti-war statement, created in response to the bombing of the Spanish town of Guernica. The monochromatic palette and fractured forms convey the horror of violence.'
    },
    {
      id: 'impression-sunrise',
      title: 'Impression, Sunrise',
      artistId: 'monet',
      category: 'painting',
      year: '1872',
      medium: 'Oil on canvas',
      dimensions: '48 cm × 63 cm',
      image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&h=500&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=1000&h=800&fit=crop',
      description: 'The painting that gave Impressionism its name. Monet captured the Le Havre harbor at dawn with loose brushwork and vibrant color that broke from academic tradition.'
    },
    {
      id: 'the-kiss-rodin',
      title: 'The Kiss',
      artistId: 'rodin',
      category: 'sculpture',
      year: '1882',
      medium: 'Marble',
      dimensions: '181.5 cm × 112.5 cm × 117 cm',
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1000&h=800&fit=crop',
      description: 'A marble sculpture depicting Paolo and Francesca, characters from Dante\'s Inferno. The tender embrace and smooth surfaces showcase Rodin\'s mastery of the human form.'
    },
    {
      id: 'anatomy-studies',
      title: 'Anatomy Studies',
      artistId: 'davinci',
      category: 'sketch',
      year: 'c. 1510',
      medium: 'Ink and chalk on paper',
      dimensions: '28.8 cm × 20 cm',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&h=800&fit=crop',
      description: 'Detailed anatomical drawings from Leonardo\'s notebooks, demonstrating his scientific approach to understanding the human body. These studies informed both his art and his contributions to medical knowledge.'
    },
    {
      id: 'the-two-fridas',
      title: 'The Two Fridas',
      artistId: 'kahlo',
      category: 'painting',
      year: '1939',
      medium: 'Oil on canvas',
      dimensions: '173.5 cm × 173 cm',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&h=800&fit=crop',
      description: 'A large-scale double self-portrait exploring Kahlo\'s dual identity. The two figures, connected by a shared vein, represent her European and Mexican heritage.'
    },
    {
      id: 'sunflowers',
      title: 'Sunflowers',
      artistId: 'vangogh',
      category: 'painting',
      year: '1888',
      medium: 'Oil on canvas',
      dimensions: '92.1 cm × 73 cm',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=750&fit=crop',
      imageLg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1000&h=800&fit=crop',
      description: 'One of Van Gogh\'s most famous series, depicting sunflowers in various stages of life. The vibrant yellows and textured brushwork showcase his distinctive Post-Impressionist style.'
    }
  ];

  function getArtist(id) {
    for (var i = 0; i < artists.length; i++) {
      if (artists[i].id === id) return artists[i];
    }
    return null;
  }

  function getArtwork(id) {
    for (var i = 0; i < artworks.length; i++) {
      if (artworks[i].id === id) return artworks[i];
    }
    return null;
  }

  function getArtworksByArtist(artistId) {
    var result = [];
    for (var i = 0; i < artworks.length; i++) {
      if (artworks[i].artistId === artistId) result.push(artworks[i]);
    }
    return result;
  }

  function getArtworksByCategory(category) {
    if (!category || category === 'all') return artworks;
    var result = [];
    for (var i = 0; i < artworks.length; i++) {
      if (artworks[i].category === category) result.push(artworks[i]);
    }
    return result;
  }

  function searchArtworks(query) {
    if (!query) return artworks;
    var q = query.toLowerCase();
    var result = [];
    for (var i = 0; i < artworks.length; i++) {
      var a = artworks[i];
      var artist = getArtist(a.artistId);
      var artistName = artist ? artist.name.toLowerCase() : '';
      if (a.title.toLowerCase().indexOf(q) !== -1 ||
          artistName.indexOf(q) !== -1 ||
          a.category.indexOf(q) !== -1) {
        result.push(a);
      }
    }
    return result;
  }

  return {
    artists: artists,
    artworks: artworks,
    getArtist: getArtist,
    getArtwork: getArtwork,
    getArtworksByArtist: getArtworksByArtist,
    getArtworksByCategory: getArtworksByCategory,
    searchArtworks: searchArtworks
  };

})();
```

- [ ] **Step 2: Verify file loads without errors**

Open browser console on index.html, confirm `KaysData.artists.length` returns 6.

- [ ] **Step 3: Commit**

```bash
git add js/data.js
git commit -m "feat: add shared data layer for artwork and artist content"
```

---

### Task 2: Create shared HTML template (nav + footer) and add color bar accent

Every page shares the same nav and footer. This task documents the exact markup that must be copy-pasted into each new HTML file. Also adds the rainbow color-bar accent under the nav (derived from logo colors).

**Files:**
- Modify: `css/styles.css` (add color-bar, active nav state, page-specific base styles)
- Modify: `index.html` (add data.js script, update nav links, add color bar)

- [ ] **Step 1: Add new shared styles to bottom of `css/styles.css`** (before responsive section)

Add: color bar gradient, active nav link state, page content wrapper, back link style, and base styles for new pages (light background sections).

- [ ] **Step 2: Update `index.html` nav links to point to real pages**

Replace all `href="#"` in nav and footer with actual page filenames: `gallery.html`, `artists.html`, `consignment.html`, `about.html`, `contact.html`, `faq.html`.

- [ ] **Step 3: Add `<script src="js/data.js"></script>` before `main.js` in `index.html`**

- [ ] **Step 4: Add color-bar div right after opening `<body>` tag** (a thin rainbow gradient bar)

- [ ] **Step 5: Commit**

```bash
git add css/styles.css index.html
git commit -m "feat: update nav links, add color bar accent, shared styles"
```

---

## Chunk 2: Homepage Redesign

### Task 3: Simplify hero section on homepage

Replace the heavy carousel with a cleaner hero that features the logo prominently, a tagline, and dual CTAs (Browse Artwork / For Artists). Keep it simple per Kay's preference.

**Files:**
- Modify: `index.html` (replace carousel HTML with simplified hero)
- Modify: `css/styles.css` (add simplified hero styles)

- [ ] **Step 1: Replace carousel section with simplified hero**

Hero contains: large logo, heading "Original Art, Personally Curated", subtitle text, two CTA buttons.

- [ ] **Step 2: Add hero styles to CSS**

Light gradient background (subtle blue/teal/gold hints from logo), centered layout, large logo display.

- [ ] **Step 3: Add Kay's personal quote section before footer**

A centered quote block: "Every piece in our gallery tells a story. Our job is to help it find the right home." — Kay Green, Founder

- [ ] **Step 4: Test homepage renders correctly**

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: redesign homepage with simplified hero and Kay's quote"
```

---

### Task 4: Update homepage artwork grid to use data.js

**Files:**
- Modify: `index.html` (replace hardcoded artwork cards with JS-rendered)
- Modify: `js/main.js` (add homepage rendering logic)

- [ ] **Step 1: Replace hardcoded artwork grid with empty container + JS rendering**

Add `id="featuredGrid"` to the artwork grid div. Remove hardcoded article cards.

- [ ] **Step 2: Add JS to `main.js` that renders 6 featured artworks from `KaysData`**

Cards link to `artwork.html?id=<artwork-id>`.

- [ ] **Step 3: Update artist spotlight section similarly**

Add `id="artistGrid"` and render from `KaysData.artists`. Cards link to `artist.html?id=<artist-id>`.

- [ ] **Step 4: Update category cards to link to `gallery.html?category=painting` etc.**

- [ ] **Step 5: Test all links navigate correctly**

- [ ] **Step 6: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: render homepage content from shared data layer"
```

---

## Chunk 3: Gallery & Artwork Pages

### Task 5: Create gallery page (`gallery.html`)

**Files:**
- Create: `gallery.html`
- Modify: `css/styles.css` (gallery-specific styles)
- Modify: `js/main.js` (gallery filter + search logic)

- [ ] **Step 1: Create `gallery.html`**

Same nav/footer as homepage. Content: page title "All Artwork", category pill filters (All, Paintings, Sculptures, Sketches), search input, artwork grid rendered by JS.

- [ ] **Step 2: Add gallery styles to CSS**

Filter pills (rounded, active state), search input styling, results count.

- [ ] **Step 3: Add gallery JS to `main.js`**

On page load: read `?category=` param, render filtered artwork grid. Click filter pill → re-render. Type in search → filter by title/artist name. Each card links to `artwork.html?id=<id>`.

- [ ] **Step 4: Test category filtering and search work**

- [ ] **Step 5: Commit**

```bash
git add gallery.html css/styles.css js/main.js
git commit -m "feat: add gallery page with category filters and search"
```

---

### Task 6: Create artwork detail page (`artwork.html`)

**Files:**
- Create: `artwork.html`
- Modify: `css/styles.css` (detail page styles)
- Modify: `js/main.js` (detail page rendering)

- [ ] **Step 1: Create `artwork.html`**

Layout: back link to gallery, large artwork image (left), info panel (right) with category tag, title, artist name + year, description, medium, dimensions. Below: "About the Artist" section with link to artist profile.

- [ ] **Step 2: Add detail page styles**

Two-column layout (image | info), responsive (stacks on mobile), medium tag colors, specs styling.

- [ ] **Step 3: Add JS to read `?id=` param and render artwork from `KaysData`**

If artwork not found, show "Artwork not found" message with link back to gallery.

- [ ] **Step 4: Test navigating from gallery → artwork detail → artist profile**

- [ ] **Step 5: Commit**

```bash
git add artwork.html css/styles.css js/main.js
git commit -m "feat: add artwork detail page with artist link"
```

---

## Chunk 4: Artist Pages

### Task 7: Create artists browse page (`artists.html`)

**Files:**
- Create: `artists.html`
- Modify: `js/main.js` (artists page rendering)

- [ ] **Step 1: Create `artists.html`**

Page title "Our Artists", subtitle, grid of artist cards rendered by JS. Each card: photo, name, media, short bio, "View Portfolio →" link to `artist.html?id=<id>`.

- [ ] **Step 2: Add JS to render artist grid from `KaysData.artists`**

- [ ] **Step 3: Test all artist links navigate correctly**

- [ ] **Step 4: Commit**

```bash
git add artists.html js/main.js
git commit -m "feat: add artists browse page"
```

---

### Task 8: Create artist profile page (`artist.html`)

**Files:**
- Create: `artist.html`
- Modify: `css/styles.css` (profile styles)
- Modify: `js/main.js` (profile rendering)

- [ ] **Step 1: Create `artist.html`**

Layout: back link to artists, artist photo (circular) + name + media + full bio, then "Works in Gallery" grid showing that artist's artworks (linking to `artwork.html?id=<id>`).

- [ ] **Step 2: Add profile styles**

Photo + info flex layout, artwork sub-grid.

- [ ] **Step 3: Add JS to read `?id=` param, render artist profile + their artworks**

If artist not found, show "Artist not found" message.

- [ ] **Step 4: Test full navigation loop: homepage → artists → artist profile → artwork → back**

- [ ] **Step 5: Commit**

```bash
git add artist.html css/styles.css js/main.js
git commit -m "feat: add individual artist profile page"
```

---

## Chunk 5: Informational Pages

### Task 9: Create about page (`about.html`)

**Files:**
- Create: `about.html`
- Modify: `css/styles.css` (about page styles)

- [ ] **Step 1: Create `about.html`**

Sections: hero with logo + "The Story Behind Kay's Originals", two-column text/image section about the gallery, Kay's quote, and a "Visit the Gallery" call to action linking to contact page.

- [ ] **Step 2: Add about page styles**

Alternating text/image rows, quote styling.

- [ ] **Step 3: Commit**

```bash
git add about.html css/styles.css
git commit -m "feat: add about page with Kay's story"
```

---

### Task 10: Create consignment page (`consignment.html`)

**Files:**
- Create: `consignment.html`

- [ ] **Step 1: Create `consignment.html`**

Content: "Consignment at Kay's Originals" heading, how it works (3-step process), what Kay looks for, the agreement process, and a CTA linking to contact page for artist inquiries.

- [ ] **Step 2: Commit**

```bash
git add consignment.html
git commit -m "feat: add consignment info page for artists"
```

---

### Task 11: Create contact page (`contact.html`)

**Files:**
- Create: `contact.html`
- Modify: `css/styles.css` (form styles)

- [ ] **Step 1: Create `contact.html`**

Two-column layout: contact form (name, email, subject dropdown, message) on left, gallery info (email, phone, address, hours) on right.

- [ ] **Step 2: Add form styles**

Clean input/textarea/select/button styling matching site aesthetic.

- [ ] **Step 3: Commit**

```bash
git add contact.html css/styles.css
git commit -m "feat: add contact page with form and gallery info"
```

---

### Task 12: Create FAQ page (`faq.html`)

**Files:**
- Create: `faq.html`
- Modify: `css/styles.css` (accordion styles)
- Modify: `js/main.js` (accordion toggle logic)

- [ ] **Step 1: Create `faq.html`**

Two sections: "For Visitors" and "For Artists". Each has 4-5 accordion Q&A items.

- [ ] **Step 2: Add accordion styles**

Click-to-expand with smooth height transition, plus/minus icon toggle.

- [ ] **Step 3: Add accordion JS to `main.js`**

Click question → toggle answer visibility, rotate icon.

- [ ] **Step 4: Commit**

```bash
git add faq.html css/styles.css js/main.js
git commit -m "feat: add FAQ page with accordion"
```

---

## Chunk 6: Polish & Cleanup

### Task 13: Responsive testing and fixes

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add responsive styles for all new pages**

Ensure gallery grid, artwork detail, artist profile, contact form, FAQ all work on mobile (640px) and tablet (1023px).

- [ ] **Step 2: Test all pages at mobile, tablet, and desktop widths**

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "fix: responsive styles for all new pages"
```

---

### Task 14: Final link audit and cleanup

- [ ] **Step 1: Audit every page — ensure all nav links, footer links, and in-page links point to correct files**

- [ ] **Step 2: Remove any remaining `href="#"` placeholder links**

- [ ] **Step 3: Remove old carousel JS code if no longer used**

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final link audit and cleanup"
```

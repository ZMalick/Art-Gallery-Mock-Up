---
name: seo-meta
description: "Generate and validate SEO meta tags, Open Graph, structured data, and sitemaps. Use this skill when the user wants to improve SEO, add meta tags, set up Open Graph tags for social sharing, create structured data/JSON-LD, generate a sitemap, or fix SEO issues. Triggers on: SEO, meta tags, Open Graph, og:image, Twitter card, structured data, JSON-LD, schema.org, sitemap, robots.txt, canonical URL, social sharing preview, search engine optimization."
---

# SEO & Meta Tags

Generate and validate SEO meta tags, Open Graph, structured data, and sitemaps.

## Process

1. **Read the target page(s)** — HTML, layout files, head components
2. **Audit existing meta tags** — identify what's missing or incorrect
3. **Generate/fix meta tags** for the pages
4. **Add structured data** if relevant
5. **Generate sitemap and robots.txt** if needed

## Essential Meta Tags

Every page needs these:

```html
<!-- Primary -->
<title>Page Title — Site Name</title>
<meta name="description" content="155 characters max, compelling summary">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://example.com/page">

<!-- Open Graph (Facebook, LinkedIn, Discord) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description for social sharing">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Site Name">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/og-image.jpg">
```

### Framework-Specific

**Next.js (App Router):**
```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
};
```

**Nuxt:**
```typescript
useHead({ title: '...', meta: [...] })
useSeoMeta({ title: '...', ogTitle: '...' })
```

**Plain HTML / other frameworks:** use `<meta>` tags in `<head>`.

## Structured Data (JSON-LD)

Add schema.org structured data for rich search results. Common types:

**Website + SearchAction** (for site-level):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Site Name",
  "url": "https://example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**Article/BlogPosting** (for blog posts):
- headline, author, datePublished, dateModified, image, publisher

**Product** (for e-commerce):
- name, image, description, offers (price, currency, availability)

**FAQ** (for FAQ pages):
- mainEntity array of Question/Answer pairs

**BreadcrumbList** (for navigation):
- itemListElement with position, name, item URL

**Organization** (for about pages):
- name, url, logo, contactPoint, sameAs (social links)

Place JSON-LD in a `<script type="application/ld+json">` tag.

## Sitemap (`sitemap.xml`)

Generate a sitemap listing all public pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

For dynamic sites (Next.js, Nuxt), generate the sitemap programmatically.

## robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml
```

## SEO Audit Checklist

When auditing, check for:
- Missing or duplicate `<title>` tags
- Missing meta descriptions
- Missing canonical URLs (causes duplicate content)
- Missing or broken Open Graph tags
- Images without alt text (also an a11y issue)
- Missing `lang` attribute on `<html>`
- No structured data
- Heading hierarchy issues (multiple h1s, skipped levels)
- Missing sitemap or robots.txt
- Non-descriptive link text ("click here")
- HTTP URLs that should be HTTPS

## Static HTML Site — Kay's Originals

For this vanilla HTML site (no framework, no SSR), use plain `<meta>` tags in each page's `<head>`. No `useHead()` or `metadata` exports.

### Art Gallery Structured Data Templates

**ArtGallery (homepage / about page):**
```json
{
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  "name": "Kay's Originals",
  "description": "A local art gallery featuring consigned paintings, sculptures, and sketches by local artists.",
  "url": "https://kaysoriginals.com",
  "image": "https://kaysoriginals.com/images/KaysOrigLogo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "City",
    "addressRegion": "State"
  }
}
```

**VisualArtwork (artwork detail pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  "name": "Artwork Title",
  "creator": {
    "@type": "Person",
    "name": "Artist Name"
  },
  "artMedium": "Oil on canvas",
  "artform": "Painting",
  "dateCreated": "2024",
  "width": "24 inches",
  "height": "36 inches",
  "image": "https://kaysoriginals.com/images/artwork.jpg",
  "description": "Description of the artwork."
}
```

**Person (artist profile pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Artist Name",
  "description": "Artist bio",
  "image": "https://kaysoriginals.com/images/artist.jpg",
  "knowsAbout": ["Painting", "Oil on canvas"]
}
```

**BreadcrumbList (all sub-pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kaysoriginals.com/" },
    { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://kaysoriginals.com/pages/gallery.html" }
  ]
}
```

### Kay's-Specific SEO Notes
- **No Product schema** — this is NOT an e-commerce site, no prices/offers
- Artwork detail and artist profile pages are JS-rendered (dynamic content from `data.js`) — structured data must be added inline or via JS injection
- `og:image` should use absolute URLs to artwork images
- Each page needs a unique `<title>` and `<meta name="description">`
- Canonical URLs must account for the `pages/` directory structure

## Output

- Updated page files with complete meta tags
- JSON-LD structured data script(s)
- `sitemap.xml` (or dynamic sitemap route)
- `robots.txt`
- Summary of changes made

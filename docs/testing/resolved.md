# Resolved Issues

Fixed bugs and confirmed preferences that have been applied. Kept here for reference so the same mistake is never made twice.

---

## Resolved

### About Page — Flat Gray Sections — 2026-03-15
**Was:** Almost the entire page was one flat `--light-gray` block. Multiple sections with the same background color blended together with no visual separation.
**Fix:** Alternated section backgrounds between `--off-white` and `--light-gray`.
**Lesson:** Always map section background colors before finalizing a page. No two adjacent sections should share the same background.

### Sub-page Heroes — Decorative Accents — 2026-03-15
**Was:** Sub-page heroes had gold line accents and gradient overlays carried over from homepage hero styles.
**Fix:** Stripped decorative accents from `.page-hero` on sub-pages. Homepage hero retains its own styles separately.
**Lesson:** Sub-page heroes must stay minimal. Check CSS class sharing — `.page-hero` affects all pages and should not carry homepage-specific decoration.

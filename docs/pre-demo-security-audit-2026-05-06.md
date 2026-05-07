# Pre-Demo Security Audit — 2026-05-06

## Summary
- 0 CRITICAL
- 0 HIGH
- 1 MEDIUM
- 2 LOW
- 3 INFO

**Top 3 risks for the demo:**
1. (MEDIUM) EmailJS submit button re-enables after failure — teacher can rapidly re-submit and burn the free-tier quota or flood Kay's inbox; no server-side debounce exists.
2. (LOW) `data.js` fields (e.g., `art.medium`, `art.dimensions`, `a.bio`) are written into `innerHTML` without HTML-escaping — safe today because the data is hardcoded, but any future CMS/CSV injection into `data.js` would immediately become XSS.
3. (LOW) EmailJS public key + service/template IDs are in plaintext client-side source — intentional by design but the teacher may flag it as a credential leak during demo review.

---

## Findings

### [MEDIUM] No client-side rate limit on EmailJS contact form re-submission

- **Location:** `js/main.js` lines 823–852 (`wireContactForm` submit handler)
- **Attack:** Teacher fills out the customer or artist contact form and submits it. After an EmailJS failure (or even success + page refresh), the submit button is re-enabled immediately. There is no cooldown, no session flag, and no hidden submission count. The teacher can submit the same form 20+ times in quick succession.
- **Impact:** Burns the EmailJS free-tier quota for the month (200 emails/month on the free plan). Floods Kay's real inbox. During the demo, rapid submissions could also visually confuse the success/error state cycling, looking like broken UX.
- **Suggested fix (NOT applied):** After a successful send, keep the button permanently disabled (or swap it for a "Sent!" label) for the session. Add a simple `var submitted = false` guard at the top of the handler: if `submitted`, return early. Example:
  ```js
  var submitted = false;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (submitted) return;
    // ... existing logic ...
    emailjs.send(...).then(function() {
      submitted = true;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sent!'; }
    });
  });
  ```

---

### [LOW] `innerHTML` used with hardcoded data fields — latent XSS if data is ever externalized

- **Location:**
  - `js/main.js:351` — `modalSpecs.innerHTML` uses `art.medium` and `art.dimensions`
  - `js/main.js:449–483` — `artworkDetail.innerHTML` uses `artwork.title`, `artwork.description`, `artwork.medium`, `artwork.dimensions`, `artist.name`, `artist.shortBio`
  - `js/main.js:650–664` — `artistDetail.innerHTML` uses `a.name`, `a.bio`, `a.media`
  - `js/main.js:734–738` — `exhibitionDetail.innerHTML` uses `exhibition.title`, `exhibition.description`, `exhibition.disclaimer`
- **Current risk:** Zero — all data comes from the hardcoded `js/data.js` IIFE which contains no user-supplied content. No URL param value is ever passed into these sinks; `KaysData.getArtist(id)` returns `null` (not the raw URL string) when the `?id=` doesn't match a known record.
- **Attack (today):** Not exploitable. Loading `artist.html?id=<img src=x onerror=alert(1)>` returns `null` from `getArtist()` and the "Artist Not Found" fallback renders via `innerHTML` with a static string — no user input reflected.
- **Impact if data.js is ever CMS-backed:** Stored XSS with no additional barrier.
- **Suggested fix (NOT applied):** Add a shared `escapeHtml(str)` helper and wrap field interpolations. For the demo, no action needed.

---

### [LOW] EmailJS credentials (public key, service ID, template IDs) in client-side source

- **Location:** `pages/contact.html:218` (public key `Qb8SA6Hjmj0s-rPZK`) and `js/main.js:810–812` (service ID `service_9rwsrlf`, template IDs `template_wxlyeed`, `template_f02f8jb`)
- **Attack:** Anyone who views source can read these and call `emailjs.send()` directly from DevTools or a script, sending emails through Kay's account without loading the site.
- **Impact:** Quota drain and potential inbox spam. This is an inherent limitation of client-side EmailJS — there is no way to hide these values and still use the EmailJS browser SDK. EmailJS rate-limits per template and per account; the teacher cannot escalate privileges (no dashboard access, no template editing, no account takeover).
- **Suggested fix (NOT applied):** In production, configure EmailJS "Allowed Origins" to restrict which domains can send via this key. For the demo, this is expected and not a code defect.

---

## Verified Safe

- **DOM XSS via `?id=` URL param (artist, artwork, exhibition detail pages):** `getParam('id')` value is passed to `KaysData.getArtist()` / `getArtwork()` / `getExhibition()`, which do strict `===` equality against a fixed hardcoded array. Non-matching IDs return `null`. The not-found fallback `innerHTML` is a static string with no user input reflected. Payload `artist.html?id=<img src=x onerror=alert(1)>` renders "Artist Not Found" — no execution.

- **DOM XSS via `?category=` URL param (gallery page):** `rawCat` from URL is only compared against strings (filter logic) and used to set `.value` on a `<select>` element (a property assignment, not `innerHTML`). Never written to any HTML sink.

- **DOM XSS via `?artistId=` URL param (gallery page):** Same as `?category=` — only assigned to `galleryArtistFilter.value`. Never reaches any HTML sink.

- **Contact form success/error reflection:** Success and error messages are static hardcoded strings in `contact.html` (`display:none` toggled via `style.display`). User-entered form values are never reflected back to the DOM — they go only to EmailJS. No `innerHTML` write from form fields.

- **`document.write` / `eval()` / `Function()` usage:** None found anywhere in `js/main.js` or `js/data.js`.

- **Open redirect via URL params:** No `window.location.href =` or `location.assign()` usage takes URL param input. The only `window.location` reference is `window.location.search` for reading params (read-only). No redirect sink.

- **JSON.parse on URL data:** No `JSON.parse()` calls found in `js/main.js` or `js/data.js`. No prototype pollution vector.

- **Hidden secrets beyond EmailJS public key:** No private keys, account dashboard URLs, or elevated-privilege tokens found in any HTML or JS file.

- **Gallery modal XSS:** `openArtworkModal(idMatch[1])` extracts the ID from the card's `href` attribute (already written by trusted `renderArtworkCard()` using `art.id` from `data.js`), passes it to `KaysData.getArtwork()`, and populates the modal using `textContent` for all text fields. The only `innerHTML` is `modalSpecs` which uses `art.medium` and `art.dimensions` from the trusted data layer.

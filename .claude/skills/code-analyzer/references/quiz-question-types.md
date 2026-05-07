# Quiz Question Types — Code Analyzer

When generating quiz questions in Quiz Mode, use these three types. Each type tests a different level of understanding. A standard 5-question quiz should include 2 Recall, 2 Predict, and 1 Fill-in — but adjust the mix based on which file is being quizzed.

---

## Type 1: Recall

**What it tests:** Whether the student understands what a piece of code does or why it exists.

**Format:** Ask about the purpose or behavior of a named function, pattern, or variable.

**Good Recall questions:**
- "What does `window.PAGE_BASE` do, and why is it set differently on `index.html` vs pages in the `pages/` folder?"
- "What is the purpose of the `'use strict'` declaration at the top of the IIFE in `main.js`?"
- "What does `KaysData.getArtworksByCategory('all')` return? What about `getArtworksByCategory('painting')`?"
- "What does the `.reveal` class do, and what triggers an element to actually animate?"
- "What's the difference between `window.IMAGE_BASE` and `window.PAGE_BASE`?"
- "What is `KaysData.artworks[]` vs `KaysData.getArtwork(id)` — when would you use each?"
- "Why does the gallery filter set `currentCategory` to an empty string for 'All' instead of the string 'all'?"

**Bad Recall questions (avoid):**
- "What is a variable?" — Too generic, not code-specific
- "What does line 45 do?" — Students need to look it up; not a knowledge test

**Feedback pattern:**
- Correct: "Exactly right. [1 sentence reinforcing why this matters for the project]"
- Wrong: "Not quite. [Correct answer in 1-2 sentences]. [Brief 'why it works this way' explanation]"

---

## Type 2: Predict

**What it tests:** Whether the student can reason about cause and effect — what would break, change, or happen if something were different.

**Format:** Describe a hypothetical change and ask what the consequence would be.

**Good Predict questions:**
- "If you removed the `if (galleryGrid)` guard before rendering artwork cards in `main.js`, what would happen when someone visits the homepage?"
- "If `window.IMAGE_BASE` was set to `''` (empty string) on a page inside the `pages/` folder, what would happen to artwork images?"
- "The hero slideshow runs on a `setInterval`. If you never cleared this interval when navigating away, what could happen over time?"
- "If `KaysData.getArtwork(id)` returns `undefined` for an unknown ID and you don't check for it, what happens when the artwork detail page tries to render `art.title`?"
- "If you changed `transition: transform 0.3s ease` to `transition: all 0.3s ease` on `.artwork-card`, what's the potential performance impact?"
- "If you removed `'use strict'` from the IIFE, what class of bugs becomes harder to catch?"
- "If the `data-page` attribute on `<body>` was missing from a page, what visible thing would break in the navigation?"

**Bad Predict questions (avoid):**
- "What would happen if you deleted the whole file?" — Too destructive/obvious
- "What if the internet was down?" — Not related to the code logic

**Feedback pattern:**
- Correct: "Good reasoning. [Optional 1 sentence on related edge case]"
- Partially correct: "You're on the right track. The full answer is: [complete the reasoning]"
- Wrong: "Not quite — here's what would actually happen: [correct prediction + brief explanation of the mechanism]"

---

## Type 3: Fill-in

**What it tests:** Whether the student can reproduce or complete a core pattern from the codebase.

**Format:** Show an incomplete code snippet and ask the student to fill in the blank. Accept equivalent correct answers — the goal is pattern recognition, not exact memorization.

**Good Fill-in questions:**

Example 1 — IIFE module pattern:
```
Complete this pattern so it matches how KaysData is structured:

var KaysData = (function() {
  'use strict';

  var artists = [ /* ... */ ];

  function getArtist(id) {
    /* ... */
  }

  return {
    ______
  };
})();

What goes in the `return { }` block, and why?
```

Example 2 — DOM guard:
```
This code is missing something important:

var searchInput = document.getElementById('artistSearch');
searchInput.addEventListener('input', function() {
  renderArtists(searchInput.value);
});

What should be added before line 2, and why?
```

Example 3 — path resolution:
```
A JS file inside pages/ needs to render an image.
The image is at images/reclaimed-tower.jpg from the project root.

Complete this line:
var src = ______ + 'images/reclaimed-tower.jpg';

What variable goes in the blank, and where is it set?
```

Example 4 — CSS variable usage:
```
This CSS rule has a mistake:

.artwork-card:hover {
  box-shadow: 0 20px 48px #00000033;
}

What's wrong with it, and how should it be written instead?
```

**Feedback pattern:**
- Correct: "Exactly. [1 sentence on why this pattern matters]"
- Close but wrong: "Almost — [specific correction]. The key reason is [brief explanation]"
- Wrong: "Here's the correct pattern: [show the answer]. [2 sentences explaining why the pattern exists]"

---

## Score Tracking

Track correct answers as an integer (0–5). After all questions:

```
Quiz complete! Score: X/5

[If X < 5:]
You missed:
- Q[N]: [1-sentence correct answer recap]
[repeat for each missed question]

Want me to save these results to code-explanations/quiz-results-YYYY-MM-DD.md?
```

The saved quiz results file (if user says yes):

```markdown
# Quiz Results — [filename]
**Date:** YYYY-MM-DD
**File Quizzed:** [filename]
**Score:** X/5

## Questions and Answers

### Q1 (Recall) — [brief question summary]
**Your answer:** [what the user said]
**Result:** Correct / Incorrect
**Correct answer:** [the right answer]

[repeat for each question]

## Study Tips
[2-3 sentences on which concepts to revisit based on what was missed]
```

---

## File-Specific Question Focus

| File | Good topics for questions |
|------|--------------------------|
| `js/data.js` | KaysData public API, IIFE return block, how search works, what `artistId` links artworks to artists |
| `js/main.js` | DOM guard pattern, PAGE_BASE/IMAGE_BASE, gallery filter state, scroll reveal, mobile nav logic, `getParam()` helper |
| `css/styles.css` | CSS custom properties, transition-only-transform rule, responsive breakpoints, `.reveal` animation |
| `index.html` | data-page attribute, window globals, hero slideshow structure, skip link |
| `pages/gallery.html` | filter pills, data-category attribute, dynamic dropdowns |

---
name: code-analyzer
description: "Analyze code quality using Opus, generate plain-English explanations using Haiku saved to code-explanations/, run interactive quizzes to test understanding, and write analysis reports. Use this skill when the user wants to deeply understand code logic, review code for quality issues, study JavaScript patterns, be quizzed on code concepts, or generate a written explanation. Triggers on: analyze code, explain code, explain the IIFE, explain the gallery, explain the filter, how does this work, code quality, code review, quiz me, quiz on, test my knowledge, write a report, generate explanation, code explanations, what does this do, walk me through, study the code, analyze data.js."
---

# Code Analyzer

A multi-mode skill for reviewing, explaining, and teaching the Kay's Originals codebase. Designed for CS students who want to understand how the site works, spot quality issues, and study the patterns used.

## Modes

| Keyword in message | Model | Action |
|---|---|---|
| `analyze [file]` | Opus subagent | Reads code, finds issues by priority, proposes fixes, asks before applying |
| `explain [file or section]` | Haiku subagent | Generates a plain-English explanation saved to `code-explanations/` |
| `report` | Opus subagent | Full analysis of all 3 core files, saves markdown report |
| `quiz [file]` | Main agent | 5-question interactive quiz on the target file |
| Any follow-up question after explain/analyze | Main agent | Q&A using conversation context |

---

## Mode Detection Rules

Scan the user's message for these keywords (case-insensitive):

1. `analyze` → Analyze mode
2. `explain` → Explain mode
3. `report` → Report mode
4. `quiz` → Quiz mode
5. A filename (`data.js`, `main.js`, `styles.css`) or section name (`gallery`, `hero`, `nav`, `filter`, `IIFE`, `KaysData`, `accordion`, `lightbox`) without a mode keyword → default to Explain mode
6. A question in the same conversation after a prior explain or analyze → Q&A mode automatically
7. None of the above on first invocation → ask: "Which mode? `analyze` / `explain` / `quiz` / `report`"

For quiz or report mode with no filename specified, default targets:
- `quiz` → `js/main.js`
- `report` → analyzes `js/data.js`, `js/main.js`, and `css/styles.css`

---

## Analyze Mode

**Goal:** Find real code quality issues and propose fixes. Never apply fixes without asking.

**Steps:**

1. Read the target file using the Read tool.
2. Read `references/analysis-checklist.md` from this skill's directory.
3. Spawn an Opus subagent using the Agent tool with `model: "opus"`. Pass it:
   - The full file content
   - The analysis checklist
   - The Codebase Cheat Sheet (see bottom of this skill)
   - This output format instruction (below)
4. After the subagent returns its report, display it to the user.
5. Ask: "Want me to apply any of these fixes? Say `yes` for all, list numbers (e.g. `1 3`), or `no`."
6. If the user approves, apply only those fixes using the Edit tool. Re-read the file first.

**Issue format the Opus subagent must produce:**

```
## Issues Found

### High Priority
- [js/main.js:128] Missing guard before DOM access
  Problem: `galleryGrid.innerHTML` called without checking if `galleryGrid` exists
  Fix:
    Before: galleryGrid.innerHTML = html;
    After:  if (galleryGrid) { galleryGrid.innerHTML = html; }

### Medium Priority
- [js/main.js:45] Magic number with no explanation
  ...

### Low Priority / Style
- ...

## Strengths
- [specific callout of what the code does well]
```

---

## Explain Mode

**Goal:** Produce a readable markdown file that a CS student can study later.

**Steps:**

1. Determine the target: a full file or a named section.
   - Full file examples: `js/data.js`, `js/main.js`, `css/styles.css`
   - Section examples: "gallery filter logic", "IIFE pattern", "scroll reveal", "lightbox"
2. Read the relevant file(s).
3. Spawn a Haiku subagent using the Agent tool with `model: "haiku"`. Pass it:
   - The file content (or the relevant section with line range context)
   - The audience note: "CS student learning web development. Explain the 'why', not just the 'what'. Keep each concept to 3-5 sentences."
   - The Codebase Cheat Sheet (see bottom of this skill) so it uses accurate terminology
   - The explanation file template (below)
   - The save path: `code-explanations/[name]-explanation.md`
4. The Haiku subagent writes the file. Confirm the path to the user.
5. Offer: "Want to ask questions about this, or go into quiz mode?"

**Naming convention for explanation files:**
- `js/data.js` → `code-explanations/data-js-explanation.md`
- `js/main.js` → `code-explanations/main-js-explanation.md`
- `css/styles.css` → `code-explanations/styles-css-explanation.md`
- "gallery filter" → `code-explanations/main-gallery-filter-explanation.md`
- "IIFE pattern" → `code-explanations/iife-pattern-explanation.md`
- "scroll reveal" → `code-explanations/scroll-reveal-explanation.md`

**Explanation file template (Haiku must follow this exactly):**

```markdown
# Code Explanation: [Descriptive Name]
**Generated:** YYYY-MM-DD  |  **File:** path/to/file.js  |  **Model:** claude-haiku-4-5

## What This Code Does
[2-3 sentences. Plain English. What problem does this code solve for the website?]

## Key Concepts

### [Concept Name — e.g., "IIFE: Immediately Invoked Function Expression"]
**What it is:** [1 sentence definition]
**Why it's used here:** [1-2 sentences specific to this project]
**The pattern:**
```js
// minimal illustrative snippet (5-10 lines max)
```

### [Next concept — repeat as needed, typically 3-6 concepts per file]

## How the Pieces Connect
[1 paragraph explaining how these concepts work together to produce the behavior the user sees on the website]

## Things to Watch Out For
- [Gotcha or non-obvious behavior — 2-5 bullets]
- [e.g., "The guard `if (galleryGrid)` on line 128 is required — removing it breaks every page that doesn't have a gallery"]
```

---

## Q&A Mode

Q&A activates automatically when the user asks a follow-up question after an explain or analyze session in the same conversation. No special keyword needed.

Answer questions using:
- The file content already read earlier in the conversation
- The Codebase Cheat Sheet patterns
- Specific line number callouts where helpful (e.g., "Line 128 in main.js...")

If the user asks about something not yet read, read the relevant section first, then answer.

After 2-3 Q&A exchanges, offer: "Ready to test what you've learned? Try `quiz [filename]`."

---

## Quiz Mode

**Goal:** Test understanding through 5 interactive questions. Generate questions fresh each time — do not reuse a fixed bank.

**Steps:**

1. Read the target file (or reuse it if already read in this session).
2. Read `references/quiz-question-types.md` to understand question formats.
3. Generate 5 questions covering the file: 2 Recall, 2 Predict, 1 Fill-in (vary this for different files).
4. Present questions ONE AT A TIME. Wait for the user's answer before showing the next.
5. After each answer, give immediate feedback:
   - Correct: Confirm it + add a reinforcing sentence about why it matters.
   - Incorrect: Gently correct it + give the right answer + a brief explanation.
6. After question 5 (or if user types `done`), show the score and a short summary.
7. Offer: "Want me to save these results to `code-explanations/quiz-results-YYYY-MM-DD.md`?"

**Quiz opening message format:**
```
Quiz mode: [filename]
I'll ask 5 questions one at a time. Answer in plain English — no pressure on exact phrasing.
Type `done` to stop early.

Question 1 of 5 (Recall):
[question text]
```

**Score message format:**
```
Quiz complete! Score: X/5

[If any wrong:]
You missed:
- Q[N]: [brief correct answer recap]

[Offer to save results]
```

---

## Report Mode

**Goal:** Comprehensive analysis of the three core files, saved as a readable markdown file.

**Steps:**

1. Read all three core files: `js/data.js`, `js/main.js`, `css/styles.css`.
2. Read `references/analysis-checklist.md`.
3. Spawn an Opus subagent with `model: "opus"`. Pass it all three file contents, the checklist, the Codebase Cheat Sheet, and the report template below.
4. The Opus subagent writes the report to `code-explanations/analysis-report-YYYY-MM-DD.md`.
5. Confirm the save path. Offer: "Want me to also generate explanation files for any of these?"

**Report template (Opus must follow this structure):**

```markdown
# Code Analysis Report — Kay's Originals
**Date:** YYYY-MM-DD
**Files Analyzed:** js/data.js, js/main.js, css/styles.css
**Analyst Model:** claude-opus-4-6

## Executive Summary
[2-3 sentences on overall code health: what's solid, what needs attention]

## Issues Found

### High Priority
[file:line — description — fix snippet]

### Medium Priority
[file:line — description — recommendation]

### Low Priority / Style Suggestions
[file:line — description]

## Strengths
[3-5 specific callouts of things the code does well, with line references]

## Pattern Reference
[Quick cheat sheet of the patterns used in this codebase — useful for studying]
- IIFE module: `var KaysData = (function() { ... return { ... }; })();`
- Guard pattern: `if (element) { element.innerHTML = html; }`
- URL params: `new URLSearchParams(window.location.search).get('id')`
- etc.
```

---

## Codebase Cheat Sheet

All subagents spawned by this skill must follow these rules. They do not have access to CLAUDE.md, so this section embeds the critical constraints.

### JavaScript Rules
- **ES5 only.** Use `var`, not `const` or `let`. Use `function`, not arrow functions (`=>`). No template literals (use string concatenation). No destructuring.
- **IIFE pattern.** Data module: `var KaysData = (function() { 'use strict'; ... return { getArtist, getArtwork, ... }; })();`. Page logic: anonymous `(function() { 'use strict'; ... })();`
- **Guard every DOM operation.** Before accessing any element: `var el = document.getElementById('x'); if (el) { ... }`. Missing guards are High Priority issues.
- **String concatenation for HTML.** `html += '<div class="card">' + title + '</div>';` — no template literals.
- **Passive scroll listeners.** `window.addEventListener('scroll', fn, { passive: true });`
- **Path globals.** `window.PAGE_BASE` (set per page for linking between pages) and `window.IMAGE_BASE` (set per page for resolving image paths). Never hardcode paths in JS.

### CSS Rules
- **Only `transform` and `opacity` should have `transition`.** Never use `transition: all`. Flag any violation as High Priority.
- **CSS custom properties only.** Never use hardcoded hex colors — always `var(--charcoal)`, `var(--blue)`, etc. Flag hardcoded colors as Medium Priority.
- **No frameworks.** No Tailwind classes, no Bootstrap classes. Only the project's own class names.

### Project Hard Rules (never suggest violating these)
- No prices, no shopping cart, no e-commerce features of any kind.
- No npm packages, no import/export, no build tools.
- No React, Vue, Angular, or any JS framework.

### Correct Terminology
- "Media" (not "mediums")
- "Artwork" singular (not "artworks")
- "Sketches" (not "drawings")
- Categories: Paintings, Sculptures, Sketches

### Core Files Quick Reference
- `js/data.js` — KaysData IIFE module. 10 artists, 21 artworks. Public API: `getArtist(id)`, `getArtwork(id)`, `getArtworksByArtist(artistId)`, `getArtworksByCategory(category)`, `searchArtworks(query)`, `getArtistList()`, `.artists[]`, `.artworks[]`
- `js/main.js` — Page logic IIFE. Sections: navigation active state, homepage hero slideshow, gallery filters, artwork detail + lightbox, artist profile, FAQ accordion, contact form validation, mobile nav, scroll reveal, navbar shadow
- `css/styles.css` — 2,127 lines. Sections: reset/base, nav, hero, artwork grid, category browse, artist spotlight, footer, color bar, page headers, gallery filters, detail pages, lightbox, contact form, responsive breakpoints (1023px tablet, 640px mobile)

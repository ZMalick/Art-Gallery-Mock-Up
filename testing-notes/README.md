# Testing Notes

This folder stores running records of observations from Playwright tests and visual reviews.
Both the user (Zaid) and the testing agent write here. The goal is to avoid repeating mistakes.

## Files

| File | Written by | Purpose |
|------|-----------|---------|
| [user-preferences.md](user-preferences.md) | Zaid | Things Zaid explicitly likes or dislikes about pages |
| [agent-flags.md](agent-flags.md) | Testing agent | Issues the agent finds during Playwright runs |
| [resolved.md](resolved.md) | Either | Closed items — fixed issues, confirmed preferences applied |

## How to Use

**When running tests:** Before starting, read `user-preferences.md` and `agent-flags.md` to know what to look for and what to avoid.

**When writing results:** Add a new entry under the correct section with a date and page name. Be specific — vague notes like "looked bad" are not useful.

**When an issue is fixed:** Move the entry to `resolved.md` with the fix date and a one-line description of what changed.

## Entry Format

```markdown
### [Page] — [Date]
**Observation:** What was seen
**Status:** Open | Fixed | Preference (permanent)
```

## Accessibility Audit Results

### Critical (blocks access for some users)
- [Modal.tsx:4] Modal overlay `<div>` has no `role="dialog"` or `aria-modal="true"` -- screen readers cannot identify it as a dialog
  WCAG: 4.1.2 (Name, Role, Value)
  Fix: Add `role="dialog"` and `aria-modal="true"` to the modal content container

- [Modal.tsx:4] Modal has no accessible name (`aria-label` or `aria-labelledby`)
  WCAG: 4.1.2 (Name, Role, Value)
  Fix: Add `aria-label="Dialog"` or `aria-labelledby` pointing to a heading inside the modal

- [Modal.tsx:4-5] No focus trap -- users can Tab out of the modal into background content
  WCAG: 2.4.3 (Focus Order), 2.1.2 (No Keyboard Trap -- inverse: modal must trap focus while open)
  Fix: Implement a focus trap that keeps Tab/Shift+Tab cycling within the modal

- [Modal.tsx:3] No focus management on open -- focus is not moved into the modal when it appears
  WCAG: 2.4.3 (Focus Order)
  Fix: Move focus to the modal container or the first focusable element when the modal opens

- [Modal.tsx:6] Close button is a `<span>` with `onClick` -- not keyboard accessible, not announced as a button
  WCAG: 2.1.1 (Keyboard), 4.1.2 (Name, Role, Value)
  Fix: Replace `<span>` with a `<button>` element

### Serious (significant barrier)
- [Modal.tsx:4] No Escape key handler to close the modal
  WCAG: 2.1.1 (Keyboard)
  Fix: Add a `keydown` event listener that calls `onClose` when Escape is pressed

- [Modal.tsx:3] No focus return -- when the modal closes, focus is not returned to the element that triggered it
  WCAG: 2.4.3 (Focus Order)
  Fix: Store a reference to the previously focused element on open and restore focus on close

- [Modal.tsx:4] Background content is not hidden from screen readers while modal is open
  WCAG: 4.1.2 (Name, Role, Value)
  Fix: Use `aria-modal="true"` (supported in modern screen readers) or set `aria-hidden="true"` on the rest of the page content

### Moderate (causes difficulty)
- [Modal.tsx:6] Close button has no accessible label -- screen readers will announce "X" which is not descriptive
  WCAG: 2.4.6 (Headings and Labels), 4.1.2 (Name, Role, Value)
  Fix: Add `aria-label="Close dialog"` to the close button

### Minor (best practice)
- [Modal.tsx:4] The overlay click-to-close behavior may cause accidental closes for users with motor impairments
  Fix: Consider requiring a deliberate close action; the current `stopPropagation` on the inner div is acceptable but ensure the click target is clear

### Summary
- 5 critical, 3 serious, 1 moderate, 1 minor issues found
- Estimated WCAG 2.1 AA compliance: Non-compliant. The modal lacks fundamental dialog accessibility patterns (role, focus trap, keyboard handling, focus management). Screen reader and keyboard-only users cannot effectively interact with this component.

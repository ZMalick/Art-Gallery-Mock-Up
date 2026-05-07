/**
 * Form Components — Public API
 *
 * In a plain HTML/CSS library there is no JS module system.
 * This file documents the available CSS classes and expected markup.
 *
 * Usage:
 *   1. Include tokens/theme.css
 *   2. Include Form/Form.styles.css
 *   3. Use the markup patterns shown in Form.html
 *
 * CSS Classes:
 *
 *   Layout
 *   ------
 *   .form-group           — Wraps label + control + helper/error
 *
 *   Label
 *   -----
 *   .form-label            — Base label styles
 *   .form-label--required  — Appends a red asterisk
 *
 *   Input
 *   -----
 *   .form-input            — Base text input
 *   .form-input--error     — Error border colour
 *
 *   Select
 *   ------
 *   .form-select           — Base select (custom caret)
 *   .form-select--error    — Error border colour
 *
 *   Textarea
 *   --------
 *   .form-textarea         — Base textarea
 *   .form-textarea--error  — Error border colour
 *
 *   Helper / Error
 *   --------------
 *   .form-helper           — Muted helper text below a field
 *   .form-error            — Red error text below a field (use role="alert")
 *
 *   Utility
 *   -------
 *   .sr-only               — Visually hidden, still read by screen readers
 *
 * Attributes:
 *   required / aria-required="true"
 *   disabled
 *   aria-invalid="true"
 *   aria-describedby="<id>"     — links to helper or error text
 */

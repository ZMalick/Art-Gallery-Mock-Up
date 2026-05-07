/**
 * Button Component — Public API
 *
 * In a plain HTML/CSS library there is no JS module system.
 * This file documents the available CSS classes and expected markup.
 *
 * Usage:
 *   1. Include tokens/theme.css
 *   2. Include Button/Button.styles.css
 *   3. Use the markup patterns shown in Button.html
 *
 * CSS Classes:
 *   .btn                — Base button styles
 *   .btn--primary       — Primary variant (filled, brand colour)
 *   .btn--secondary     — Secondary variant (filled, green)
 *   .btn--outline       — Outline variant (bordered, transparent bg)
 *   .btn--ghost         — Ghost variant (no border, transparent bg)
 *   .btn--sm            — Small size
 *   .btn--md            — Medium size (default)
 *   .btn--lg            — Large size
 *   .btn--loading       — Loading state (hides text, shows spinner)
 *   .btn__spinner       — Spinner element inside a loading button
 *   .btn__icon          — Icon wrapper inside a button
 *
 * Attributes:
 *   disabled            — Native disabled state
 *   aria-disabled="true" — Announce disabled to assistive tech
 *   aria-busy="true"    — Announce loading state
 *   aria-label          — Provide alternative text when visual label is hidden
 */

/**
 * Card Component — Public API
 *
 * In a plain HTML/CSS library there is no JS module system.
 * This file documents the available CSS classes and expected markup.
 *
 * Usage:
 *   1. Include tokens/theme.css
 *   2. Include Card/Card.styles.css
 *   3. (Optional) Include Button/Button.styles.css if using buttons in footer
 *   4. Use the markup patterns shown in Card.html
 *
 * CSS Classes:
 *   .card                  — Base card wrapper (use <article> or <a>)
 *   .card--elevated        — Shadow variant (default look)
 *   .card--outlined        — Bordered variant, no shadow
 *   .card--flat            — No border/shadow, subtle background
 *   .card--interactive     — Hover/click styles for non-anchor cards
 *   .card__media           — Optional top image (use <img>)
 *   .card__header          — Header slot
 *   .card__header-title    — Heading inside header (h2 / h3)
 *   .card__header-subtitle — Subtext below the title
 *   .card__body            — Main content slot
 *   .card__footer          — Footer slot (actions, links)
 *
 * Attributes:
 *   role="article"         — For interactive / standalone cards
 *   aria-label             — For clickable cards wrapped in <a>
 */

import React, { forwardRef } from 'react';
import styles from './Button.styles.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Content to render inside the button */
  children: React.ReactNode;
}

/**
 * Button component with multiple variants, sizes, and accessible states.
 *
 * Accessibility:
 * - Uses native `<button>` element for built-in keyboard support (Enter/Space)
 * - `aria-disabled` used alongside `disabled` for screen reader clarity
 * - `aria-busy` announces loading state to assistive technology
 * - Visible focus indicator via `:focus-visible`
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      loading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {children}
        {loading && <span className={styles.spinner} aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = 'Button';

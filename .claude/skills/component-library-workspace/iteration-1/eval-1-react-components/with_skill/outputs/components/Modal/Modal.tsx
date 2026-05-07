import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Modal.styles.module.css';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title displayed in the header */
  title?: string;
  /** Size of the modal */
  size?: ModalSize;
  /** Whether to show the close button */
  closable?: boolean;
  /** Content for the modal body */
  children: React.ReactNode;
  /** Content rendered in the footer area */
  footer?: React.ReactNode;
  /** Accessible label for the modal (used if title is not provided) */
  'aria-label'?: string;
}

/**
 * Modal dialog component with focus trapping, keyboard navigation, and ARIA support.
 *
 * Accessibility:
 * - `role="dialog"` and `aria-modal="true"` for screen readers
 * - `aria-labelledby` linked to the title
 * - Focus is trapped inside the modal while open
 * - Escape key closes the modal
 * - Focus returns to the previously focused element on close
 */
export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closable = true,
  children,
  footer,
  'aria-label': ariaLabel,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = title ? 'modal-title' : undefined;

  // Store previous focus and manage body scroll
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus the modal container on open
      requestAnimationFrame(() => {
        modalRef.current?.focus();
      });
    }

    return () => {
      document.body.style.overflow = '';
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  // Focus trap
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && closable) {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [closable, onClose]
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget && closable) {
        onClose();
      }
    },
    [closable, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[size]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-label={!title ? ariaLabel : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {(title || closable) && (
          <div className={styles.header}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            {closable && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                &#x2715;
              </button>
            )}
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

Modal.displayName = 'Modal';

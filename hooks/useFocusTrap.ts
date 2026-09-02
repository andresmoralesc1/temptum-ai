'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Traps Tab focus inside a container while `active` is true.
 * - Tab from last focusable → cycles to first
 * - Shift+Tab from first → cycles to last
 * - Escape → calls onEscape (if provided)
 * - Restores focus to the previously-focused element when deactivated
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    // Remember who had focus so we can restore on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] => {
      const selector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',');
      return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null,
      );
    };

    // Move focus into the container on open.
    const initial = getFocusable();
    if (initial.length > 0) {
      // Delay one frame so the panel finishes its transition.
      requestAnimationFrame(() => initial[0]?.focus());
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // Restore focus to the trigger.
      previouslyFocused?.focus?.();
    };
  }, [active, ref, onEscape]);
}

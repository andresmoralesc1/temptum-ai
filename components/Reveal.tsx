'use client';

import {
  createElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'header' | 'figure' | 'p' | 'ul';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Delay in ms before the transition starts once the element is in view. */
  delay?: number;
  /** Vertical offset (in Tailwind units, e.g. 4 = 1rem) the element starts at. */
  offset?: number;
  /** Element tag to render. Default: div. */
  as?: RevealTag;
}

/**
 * Wraps children in an element that fades + slides into view the first time
 * it intersects the viewport. Uses IntersectionObserver with `once: true` so
 * the reveal only happens once per page load.
 *
 * Respects `prefers-reduced-motion`: if the user prefers reduced motion,
 * children render visible immediately and the CSS guard in globals.css
 * nulls the transition duration anyway.
 */
export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { children, delay = 0, offset = 4, as = 'div', className, style, ...rest },
  externalRef,
) {
  const internalRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Forward ref via callback (useRef + callback ref pattern).
  const setRef = (node: HTMLElement | null) => {
    internalRef.current = node;
    if (typeof externalRef === 'function') externalRef(node);
    else if (externalRef) externalRef.current = node;
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const el = internalRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Tailwind dynamic class names must be generated literally — small map.
  const offsetClass =
    {
      2: 'translate-y-2',
      3: 'translate-y-3',
      4: 'translate-y-4',
      5: 'translate-y-5',
      6: 'translate-y-6',
      8: 'translate-y-8',
    }[offset] ?? 'translate-y-4';

  return createElement(
    as,
    {
      ref: setRef,
      style: { transitionDelay: visible ? `${delay}ms` : '0ms', ...style },
      className: cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : `${offsetClass} opacity-0`,
        className,
      ),
      ...rest,
    },
    children,
  );
});

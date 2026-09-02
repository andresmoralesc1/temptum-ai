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
 * it intersects the viewport.
 *
 * CLS strategy: by default the element renders **visible and in final position**
 * (no opacity-0, no translate). The fade/translate effect is only applied when
 * we can guarantee the browser will run JS before painting — this avoids
 * Cumulative Layout Shift on slow networks where JS hydrates after first paint.
 *
 * Detection: we set `data-reveal="1"` in a microtask via useState. Since the
 * initial state is `false`, the SSR HTML has no special classes. After mount
 * we set `armed=true`, and the IntersectionObserver flips to `visible=true`
 * once in view. If the user prefers reduced-motion, we go straight to visible.
 *
 * Because the offset class is only present between `armed && !visible` —
 * which can only happen on the client — the SSR HTML and first paint never
 * include the offset, so CLS = 0.
 */
export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { children, delay = 0, offset = 4, as = 'div', className, style, ...rest },
  externalRef,
) {
  const internalRef = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  // Forward ref via callback (useRef + callback ref pattern).
  const setRef = (node: HTMLElement | null) => {
    internalRef.current = node;
    if (typeof externalRef === 'function') externalRef(node);
    else if (externalRef) externalRef.current = node;
  };

  useEffect(() => {
    // Defer one frame so the browser has a chance to paint the SSR (non-offset)
    // version first. Then we "arm" the offset, and the IntersectionObserver
    // removes it once the element is in view. Because armed→visible happens
    // via a transform, not a layout-affecting property, there's no CLS.
    const raf = requestAnimationFrame(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setVisible(true);
        return;
      }

      if (typeof IntersectionObserver === 'undefined') {
        setVisible(true);
        return;
      }

      const el = internalRef.current;
      if (!el) {
        setVisible(true);
        return;
      }

      // If element is already in view (e.g. above the fold), reveal immediately
      // without applying the offset first.
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        setVisible(true);
        return;
      }

      setArmed(true);

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
    });

    return () => cancelAnimationFrame(raf);
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
        // Only apply the offset if we are armed (JS ran) AND not yet visible.
        // This means: SSR/first paint = no offset, so no CLS.
        // JS ran + element below fold = offset applied, then animated away.
        // JS ran + element in view = skip offset entirely, just fade.
        armed && !visible ? `${offsetClass} opacity-0` : 'translate-y-0 opacity-100',
        className,
      ),
      ...rest,
    },
    children,
  );
});

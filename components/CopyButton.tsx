'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  /** Text to copy to the clipboard. */
  value: string;
  /** Accessible label for screen readers. */
  label: string;
  className?: string;
}

/**
 * A small "copy" button next to a value (email, phone, etc.). On click,
 * copies the value to the clipboard and shows a brief "Copied" tooltip.
 * Falls back gracefully if the Clipboard API is unavailable.
 *
 * The "copied" feedback is also announced via an aria-live region so
 * screen readers know the action succeeded.
 */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [announced, setAnnounced] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback: temporary textarea + execCommand. Deprecated but
        // supported almost everywhere as a safety net.
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setAnnounced(`${value} copiado al portapapeles`);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setAnnounced('No se pudo copiar. Seleccione el texto manualmente.');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${label}: copiar ${value}`}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded text-navy-600 transition-colors duration-150',
          'hover:bg-navy-50 hover:text-navy-950 active:scale-95',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2',
          copied && 'text-gold hover:text-gold',
          className,
        )}
      >
        {copied ? (
          <Check size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy size={16} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
      {/* Live region for screen readers only. */}
      <span role="status" aria-live="polite" className="sr-only">
        {announced}
      </span>
    </>
  );
}

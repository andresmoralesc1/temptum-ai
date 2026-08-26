import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium uppercase tracking-widest transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  primary: 'bg-navy-600 text-white hover:bg-navy-800',
  secondary: 'border border-navy-600 text-navy-600 hover:bg-navy-100',
};

type LinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant };
type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant };

function isLinkProps(props: LinkProps | ButtonProps): props is LinkProps {
  return 'href' in props && typeof (props as LinkProps).href === 'string';
}

export function Button(props: (LinkProps | ButtonProps) & { children: ReactNode }) {
  const variant: Variant = (props.variant ?? 'primary') as Variant;
  const cls = cn(base, variants[variant]);

  if (isLinkProps(props)) {
    const { variant: _v, className, children, ...rest } = props;
    return (
      <Link {...rest} className={cn(cls, className)}>
        {children}
      </Link>
    );
  }
  const { variant: _v, className, children, ...rest } = props;
  return (
    <button {...rest} className={cn(cls, className)}>
      {children}
    </button>
  );
}
import type { ReactElement } from 'react';

type FlagCode = 'CO' | 'US';

const FLAGS: Record<FlagCode, ReactElement> = {
  // Colombia: yellow (top half), blue (bottom quarter), red (bottom quarter).
  CO: (
    <svg
      viewBox="0 0 24 16"
      role="img"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect width="24" height="16" fill="#FCD116" />
      <rect y="8" width="24" height="4" fill="#003893" />
      <rect y="12" width="24" height="4" fill="#CE1126" />
    </svg>
  ),
  // United States: 13 stripes (7 red, 6 white) with a blue canton in the
  // top-left covering the first 4 stripes.
  US: (
    <svg
      viewBox="0 0 24 16"
      role="img"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect width="24" height="16" fill="#FFFFFF" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} y={i * (16 / 13) * 2} width="24" height={16 / 13} fill="#B22234" />
      ))}
      <rect width="10" height={(16 / 13) * 7} fill="#3C3B6E" />
    </svg>
  ),
};

export function FlagIcon({ code, className }: { code: FlagCode; className?: string }) {
  return (
    <span
      className={className ?? 'inline-block h-3 w-5 overflow-hidden rounded-sm'}
      style={{ display: 'inline-block' }}
    >
      {FLAGS[code]}
    </span>
  );
}

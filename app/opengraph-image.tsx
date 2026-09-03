import { ImageResponse } from 'next/og';

export const alt = 'Temptum — Corporate & Government Affairs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0A1930',
          padding: '80px 96px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#E7EDF5',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Temptum
        </div>

        {/* Center: monogram + headline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 64,
            marginTop: 64,
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 280,
              height: 280,
              alignItems: 'center',
              justifyContent: 'center',
              background: '#12294D',
              border: '2px solid #B08D57',
              color: '#B08D57',
              fontSize: 200,
              fontWeight: 700,
              letterSpacing: '-0.05em',
            }}
          >
            T
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#B08D57',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Colombia
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#E7EDF5',
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              <span>Corporate &amp;</span>
              <span>Government</span>
              <span>Affairs</span>
            </div>
          </div>
        </div>

        {/* Bottom: tagline + domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#E7EDF5',
            fontSize: 22,
            marginTop: 32,
          }}
        >
          <div style={{ display: 'flex', maxWidth: 720, opacity: 0.85 }}>
            Nexo de influencia, rigor técnico y mitigación de riesgos para el
            sector privado y las instituciones.
          </div>
          <div style={{ display: 'flex', color: '#B08D57', fontWeight: 600 }}>
            temptum.io
          </div>
        </div>
      </div>
    ),
    size,
  );
}

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Temptum',
    short_name: 'Temptum',
    description:
      'Centro especializado en Colombia en corporate & government affairs: comunicaciones estratégicas, análisis regulatorio, gestión de crisis y sostenibilidad ASG.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1930',
    theme_color: '#0A1930',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
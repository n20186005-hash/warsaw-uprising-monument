import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Warsaw Uprising Monument - Visitor Guide',
    short_name: 'Warsaw Monument',
    description:
      'Visitor guide to the Warsaw Uprising Monument (Pomnik Powstania Warszawskiego) at plac Krasińskich in Warsaw, Poland.',
    start_url: '/pl',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3a7a8d',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}

import type { MetadataRoute } from 'next';
import { SALON } from '@/lib/config/salon';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: `${SALON.nome} - ${SALON.description}`,
    short_name: SALON.nome.split(' ')[0],
    description: SALON.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: SALON.cores.fundo,
    theme_color: SALON.cores.fundoCard,
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

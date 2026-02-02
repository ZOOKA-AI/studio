import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ذكر - القرآن الكريم | Zekr - Holy Quran',
    short_name: 'ذكر Zekr',
    description: 'منصة ذكر للقرآن الكريم - تلاوة، تفسير، وحفظ القرآن الكريم مع أدوات ذكية',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    orientation: 'portrait',
    lang: 'ar',
    dir: 'rtl',
    categories: ['religion', 'education', 'lifestyle'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-1.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/screenshot-2.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
    shortcuts: [
      {
        name: 'قراءة القرآن',
        short_name: 'قراءة',
        description: 'ابدأ قراءة القرآن الكريم',
        url: '/',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'المواعيد',
        short_name: 'المواعيد',
        description: 'عرض المواعيد',
        url: '/calendar',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}

import type { NavItem } from '@/types';

export const SITE_CONFIG = {
  name: 'Harshal Honde Portfolio',
  description: 'Software Engineer portfolio showcasing production-grade backend systems, full-stack projects, and scalable architectures',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@harshalhonde',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

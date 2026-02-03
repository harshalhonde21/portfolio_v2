import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants/siteConfig';
import { PERSONAL_INFO, PROJECTS, SOCIAL_LINKS } from '@/lib/constants/portfolio';

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.bio,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: PERSONAL_INFO.name, url: SITE_CONFIG.url }],
  generator: 'Next.js',
  keywords: [
    'Harshal',
    'Harshal Honde',
    'Harshal Honde Portfolio',
    'Harshal Search',
    'Harshal Honde Search',
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Backend Engineer',
    'Web Developer',
    'Portfolio',
    'Nagpur Developer',
    'India Developer'
  ],
  referrer: 'origin-when-cross-origin',
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  icons: {
    icon: '/profile-placeholder.png',
    apple: '/profile-placeholder.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.bio,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/profile-pic.png', // Using high-res profile pic for OG
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
      },
      {
        url: '/profile-placeholder.png',
        width: 500,
        height: 500,
        alt: `${PERSONAL_INFO.name} Avatar`,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.bio,
    images: ['/profile-pic.png'],
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  category: 'technology',
};

// JSON-LD Structured Data
export function getPersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.number,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/profile-pic.png`,
    description: PERSONAL_INFO.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nagpur',
      addressCountry: 'India'
    },
    sameAs: SOCIAL_LINKS.map(link => link.url).filter(url => !url.startsWith('tel:')),
    knowsAbout: ['Software Engineering', 'React', 'Next.js', 'Node.js', 'System Design', 'Cloud Computing'],
    worksFor: {
      '@type': 'Organization',
      name: 'Leadows Technologies Pvt. Ltd'
    }
  };
}

export function getWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    publisher: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function getPortfolioStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PROJECTS.filter((p) => p.featured).map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.description,
        url: project.liveUrl || project.githubUrl,
        image: project.image ? `${SITE_CONFIG.url}${project.image}` : undefined,
        programmingLanguage: project.technologies,
        author: {
          '@type': 'Person',
          name: PERSONAL_INFO.name
        }
      },
    })),
  };
}

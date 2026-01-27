import type { PersonalInfo, SocialLink, Skill, Experience, Project } from '@/types';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Harshal Honde',
  title: 'Software Engineer',
  email: 'harshalhonde17@gmail.com',
  location: 'Nagpur, India',
  bio: 'Software Engineer experienced in building and scaling production-grade backend systems in startup and telecom environments. Strong full-stack background with React, Next.js, Node.js, and Spring Boot, with end-to-end ownership from system design to production deployment.',
  image: '/images/profile.jpg',
  number: '+91-7385024985'
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/harshalhonde21',
    icon: 'github',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/harshalhonde',
    icon: 'linkedin',
  },
  {
    platform: 'Phone',
    url: 'tel:+917385024985',
    icon: 'phone',
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },
  { name: 'ShadCN', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'RESTful APIs', category: 'backend' },
  { name: 'RabbitMQ', category: 'backend' },
  { name: 'Kafka', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },

  // Tools & Cloud
  { name: 'AWS S3', category: 'tools' },
  { name: 'AWS EC2', category: 'tools' },
  { name: 'AWS Amplify', category: 'tools' },
  { name: 'AWS Cognito', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'NPM', category: 'tools' },
  { name: 'NoSQL', category: 'tools' },
  { name: 'OOP', category: 'tools' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    company: 'Leadows Technologies Pvt. Ltd',
    role: 'Software Engineer',
    period: 'Mar 2025 - Present',
    description: [
      'Built and optimized large-file direct upload pipeline to AWS S3 using React and AWS SDK, reducing transfer costs by ~30%',
      'Developed real-time analytics dashboard (TypeScript + ShadCN), delivering real-time insights from OCR-processed utility bill data for SolarTech clients',
      'Designed and developed ERP modules (Asset Management, HR, Operations) using React, Spring Boot, and PostgreSQL, automating internal workflows and reducing manual operations across teams',
      'Delivered scalable, high-performance frontend systems for SolarTech and BioTech domains, focusing on maintainability and production reliability',
      'Collaborated with design, product, and client stakeholders to ship production features under strict timelines in a fast-paced startup environment',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Node.js', 'AWS S3', 'Spring Boot', 'PostgreSQL', 'ShadCN', 'RabbitMQ'],
    image: '/seminar.png',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'project-rag',
    title: 'RAG Project Chat Bot',
    description: 'Full-stack RAG chatbot with Express backend, vector search (Qdrant), and React PWA frontend. Features Gemini AI integration, Redis session management, and smooth UI animations.',
    image: '/images/projects/rag-chatbot.jpg',
    technologies: ['React', 'Node.js', 'Gemini AI', 'Redis', 'Qdrant', 'VectorDB'],
    githubUrl: 'https://github.com/harshalhonde21/News-Chat-Bot',
    featured: true,
  },
  {
    id: 'project-1',
    title: 'SpectaStyle',
    description: 'Full-stack e-commerce website built with the MERN stack. Features end-to-end encrypted website, from listing products to ordering, using the Stripe payment gateway. Selected in GSSOC\'24 among 200 Projects in 13 Countries with 100+ Stars.',
    image: '/images/projects/spectastyle.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe'],
    githubUrl: 'https://github.com/harshalhonde21/EcommerceSpectastyle',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Court Case Priority System',
    description: 'Real-world project that prioritizes court cases based on a Machine Learning model, ensuring that cases needing urgent attention are addressed first.',
    image: '/images/projects/court-case.jpg',
    technologies: ['Python', 'Machine Learning', 'React', 'Node.js'],
    githubUrl: 'https://github.com/harshalhonde21/technex24',
    featured: true,
  },
];

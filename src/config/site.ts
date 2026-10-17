export interface SiteConfig {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  bio: string[];
  intro: string[];
  footerDescription: string;
  interests: string[];
  skills: { label: string; items: string[] }[];
  socials: { label: string; href: string }[];
  navigation: { label: string; href: string }[];
  photo: string | null;
  cv: { available: boolean; path: string };
  education: {
    institution: string;
    degree: string;
    period: string;
    details: string[];
  }[];
}

// Profile details used across the site.
export const site: SiteConfig = {
  name: 'Elham Cheraghi',
  firstName: 'Elham',
  initials: 'EC',
  role: 'Computer Science · Machine Learning',
  tagline: 'Exploring intelligence, from biological data to adaptive systems.',
  description:
    'Elham Cheraghi’s portfolio: machine learning research, search and optimization projects, and frontend development.',
  email: 'eli2002ch@gmail.com',
  location: 'Isfahan, Iran',
  bio: [
    'My background is in computer science at the University of Isfahan. I am interested in how learning algorithms and optimization can help us understand complex systems and make better decisions.',
    'My research has focused on ranking perturbed biological pathways from gene-expression data, using R for differential-expression analysis and PyTorch for neural ranking.',
    'Alongside research, I have built responsive dashboards and real-time sensor interfaces with React and Next.js. My teaching experience covers machine learning and databases.',
  ],
  intro: [
    'I explore how machine learning and thoughtful algorithms can make sense of complex systems.',
    'From ranking biological pathways to finding a better route through a changing grid, I like working where data, logic, and real-world questions meet.',
  ],
  footerDescription: 'Computer science, thoughtful experiments, and curiosity about what comes next.',
  interests: [
    'Autonomous systems and machine learning',
    'Evolutionary computation',
    'Bioinformatics',
    'Network algorithms and optimization',
  ],
  skills: [
    { label: 'Languages', items: ['Python', 'R', 'JavaScript', 'C', 'HTML', 'CSS'] },
    {
      label: 'Machine learning & data',
      items: ['PyTorch', 'scikit-learn', 'NumPy', 'pandas', 'Matplotlib', 'limma'],
    },
    {
      label: 'Web & tools',
      items: ['React', 'Next.js', 'Socket.IO', 'Git', 'GitHub', 'SPSS'],
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/elham-cheraghi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elham-cheraghi-908589389' },
  ],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'CV', href: '/cv/' },
    { label: 'Contact', href: '/contact/' },
  ],
  photo: null,
  cv: { available: true, path: '/cv.pdf' },
  education: [
    {
      institution: 'University of Isfahan',
      degree: 'B.Sc. in Computer Science',
      period: 'September 2022 – September 2026',
      details: [
        'GPA: 17.29/20',
        'Final-year GPA: 19.85/20',
        'Coursework included machine learning, artificial intelligence, data mining, graph theory, and nonlinear optimization.',
      ],
    },
  ],
};

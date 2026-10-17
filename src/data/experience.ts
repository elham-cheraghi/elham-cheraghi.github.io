export interface Experience {
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  href?: string;
}

export const experience: Experience[] = [
  {
    title: 'Teaching Assistant',
    organization: 'Machine Learning course',
    location: 'Isfahan',
    period: 'September 2026 – Present',
    description: 'Supporting a course in supervised and unsupervised learning.',
    highlights: [
      'Taught in-class concepts and led hands-on sessions with machine learning models.',
      'Prepared exercises and exams covering regression, classification, optimization, and model evaluation.',
    ],
    href: 'https://github.com/uisf-course/ML_405',
  },
  {
    title: 'Teaching Assistant',
    organization: 'Database course',
    location: 'Isfahan',
    period: 'September 2026 – Present',
    description: 'Supporting relational database design and SQL coursework.',
    highlights: [
      'Prepared exercises on database concepts and SQL, and graded student assignments.',
      'Prepared exams covering schemas, joins, constraints, and normalization.',
    ],
    href: 'https://github.com/HosnaSltn/data_base_2026',
  },
  {
    title: 'Frontend Developer',
    organization: 'PayaTech / Dunijet',
    location: 'Isfahan',
    period: 'June 2025 – September 2025',
    description: 'Built responsive dashboards and interfaces for real-time sensor data.',
    highlights: [
      'Used React, Next.js, interactive charts and tables, and Socket.IO.',
      'Built reusable components, integrated REST and WebSocket APIs, and refined the user experience with product and design teams.',
    ],
  },
];

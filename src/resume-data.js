/**
 * Single source of truth for every piece of resume content rendered by the site.
 * Only information supplied by Hari Krishna Kumar is present here — no dates,
 * no invented metrics, no unprovided academic details.
 */

export const RESUME = {
  name: 'Hari Krishna Kumar',
  shortName: 'HKK',
  designation: 'Full-Stack Developer | AI Enthusiast | Technical Educator',
  tagline: 'FULL-STACK DEVELOPER / AI ENTHUSIAST / TECHNICAL EDUCATOR',
  organisation: 'YAJURVEDH',
  classification: 'PERSONAL DEVELOPER PORTFOLIO',
  availability: 'Open to opportunities',

  about:
    'Full-Stack Developer, AI Enthusiast and Technical Educator focused on software engineering, AI agents, computer vision and workflow automation.',

  profile: {
    discipline: 'FULL-STACK DEV',
    roles: '02 ROLES',
    status: 'OPEN TO WORK',
  },

  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    short: 'BCA',
    cgpa: '8.06',
    field: 'COMPUTER APPS',
    status: 'COMPLETE',
    level: 'UNDERGRAD',
    scale: '10.0',
  },

  experience: [
    {
      role: 'Chief Technology Officer (CTO)',
      org: 'Yajurvedh',
      code: 'CTO',
      points: [
        'Software architecture and development.',
        'Database management.',
        'Infrastructure and deployment.',
        'Technical project management.',
        'Technology strategy and decision-making.',
        'Technical team coordination.',
      ],
    },
    {
      role: 'Guest Lecturer',
      org: 'Multiple Colleges, Bengaluru',
      code: 'LECT',
      points: [
        'Teaching Python, SQL, Excel and Data Science.',
        'Conducting practical laboratory sessions.',
        'Curriculum and session planning.',
        'Guiding students through technical projects.',
        'Delivering hands-on technical training.',
      ],
    },
  ],

  skillGroups: [
    { name: 'Programming', code: 'LANG', items: ['Python', 'JavaScript'] },
    { name: 'Frontend', code: 'FRONT', items: ['HTML', 'CSS', 'MERN'] },
    { name: 'Backend', code: 'BACK', items: ['FastAPI', 'Flask', 'Django'] },
    { name: 'Databases', code: 'DATA', items: ['MySQL', 'MariaDB', 'SQL'] },
    { name: 'AI & Computer Vision', code: 'AI / CV', items: ['OpenCV', 'DeepFace', 'MediaPipe'] },
    { name: 'AI & Automation', code: 'AUTO', items: ['AI Agents', 'N8N Workflow Automation'] },
    { name: 'Data Science', code: 'SCI', items: ['NumPy', 'Pandas', 'Matplotlib'] },
    { name: 'Developer Tools', code: 'TOOLS', items: ['Git', 'GitHub', 'VS Code', 'Android Studio'] },
    { name: 'Platforms', code: 'PLAT', items: ['Firebase', 'XAMPP', 'N8N'] },
  ],

  /* The eight rows of the ARM COIL panel — client-facing stack surface. */
  languages: [
    { name: 'Python', code: 'LANG' },
    { name: 'JavaScript', code: 'LANG' },
    { name: 'HTML', code: 'FRONT' },
    { name: 'CSS', code: 'FRONT' },
    { name: 'MERN', code: 'FRONT' },
    { name: 'FastAPI', code: 'BACK' },
    { name: 'Flask', code: 'BACK' },
    { name: 'Django', code: 'BACK' },
  ],

  projects: [
    {
      id: 'vision',
      code: 'AI / CV',
      title: 'AI-Powered Facial Recognition & Computer Vision Systems',
      stage: 'OPTICS',
    },
    {
      id: 'lms',
      code: 'LMS',
      title: 'Educational Learning Management System',
      stage: 'BELL',
    },
    {
      id: 'inventory',
      code: 'CSIR-NAL',
      title: 'Inventory & Resource Management System – CSIR-NAL (Government Sector)',
      stage: 'PUMP',
    },
  ],

  contact: {
    email: 'harikrishnamrb@gmail.com',
    phone: '9449445802',
    phoneHref: '+919449445802',
    github: 'https://github.com/HariKrishnaKumar',
    linkedin: 'https://www.linkedin.com/in/hari-krishna-kumar-0679592a7/',
    emailLabel: 'Click to Mail Me',
    phoneLabel: 'Click to Call Me',
    githubLabel: 'Click Here',
    linkedinLabel: 'Click Here',
  },

  messages: {
    about:
      "Hey! I'm Hari's digital guide. Let me introduce you to his professional background.",
    skills:
      "Let's explore Hari's technical toolkit, including Python, full-stack development, AI and automation.",
    experience:
      'Hari is the CTO at Yajurvedh and also works as a Guest Lecturer across multiple colleges in Bengaluru.',
    education:
      'Hari holds a Bachelor of Computer Applications degree with a CGPA of 8.06.',
    projects:
      "Here are three of Hari's project areas, including computer vision, educational software and inventory management.",
    contact:
      'Want to connect with Hari? You can reach him through email, phone, GitHub or LinkedIn.',
    generic:
      "Exploring Hari's portfolio? Click on a section and I'll show you what's inside.",
  },
};

export const TOTAL_TECH = (() => {
  const seen = new Set();
  RESUME.skillGroups.forEach((g) => g.items.forEach((i) => seen.add(i.toLowerCase())));
  return seen.size;
})();

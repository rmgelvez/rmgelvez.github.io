import { Profile } from '../models/profile.model';

export const PROFILE_DATA_EN: Profile = {
  name: 'Ronal Mauricio Gelvez Ruiz',
  role: 'Systems Engineer - Senior .NET / Azure Developer',
  about: 'As a .Net/Azure Software Developer, I am passionate about technology and how it helps us solve problems. My goal is to generate knowledge and continuously learn cutting-edge tools and techniques to contribute to Software Engineering.',
  avatarUrl: 'https://2.gravatar.com/userimage/176784774/2feba4a018bd715929cbe511d5308f3a?size=400',
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/rmgelvez',
      icon: 'github'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ronalgelvez',
      icon: 'linkedin'
    },
    {
      platform: 'X',
      url: 'https://x.com/rmgelvez',
      icon: 'twitter'
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/rmgelvez/',
      icon: 'instagram'
    },
    {
      platform: 'Email',
      url: 'mailto:rmgelvez@hotmail.com',
      icon: 'email'
    }
  ],
  skills: [
    '.NET / .NET Core / .NET Framework',
    'Entity Framework',
    'Azure Services',
    'SQL Server / MySQL / PostgreSQL',
    'MongoDB',
    'GIT / GIT Flow',
    'Angular',
    'JavaScript / TypeScript / HTML / CSS',
    'Docker',
    'Xunit / Nunit'
  ],
  experience: [
    {
      company: 'Global Hitss',
      role: 'Senior Developer',
      startDate: 'Dec 2024',
      endDate: null,
      highlights: [
        'Development and optimization of miniprograms within Claro Colombia\'s SuperApp (Alipay framework)',
        'Analysis, support, and maintenance of EPM\'s billing web application using Angular',
        'Implementation of unit tests and design patterns for scalable solutions',
        'Development lifecycle management via Azure DevOps (Scrum, pipelines, and security)',
        'Application of Clean Architecture and SOLID principles'
      ]
    },
    {
      company: 'Neoris',
      role: 'Experienced Developer',
      startDate: 'Aug 2021',
      endDate: 'Dec 2024',
      highlights: [
        'Development and maintenance of ETB\'s management technological platforms',
        'Microservices development in .NET Core and Mongo with Docker and event-driven services',
        'Mobile app development for Claro using Miniprograms',
        'Administration of Azure Services and SQL Server/MongoDB databases',
        'Continuous Integration and Deployment (CI/CD)'
      ]
    },
    {
      company: 'Ingeneo S.A.S',
      role: 'Software Developer .NET',
      startDate: 'May 2021',
      endDate: 'Aug 2021',
      highlights: [
        'Contribution to new features for a guarantee management application',
        'SOAP services consumption',
        'Usage of .NET Framework and Azure cloud',
        'DevOps and SCRUM within Azure environment'
      ]
    },
    {
      company: 'Neptuno Smart System S.A.S',
      role: 'Development Engineer',
      startDate: 'Apr 2019',
      endDate: 'May 2021',
      highlights: [
        '.NET web solutions for managing national transits',
        'Cloud services management: App Services, Logic Apps, and Storage Accounts',
        'REST API development and security implementation (authentication and biometrics)',
        'DevOps with Azure platform (CI/CD)'
      ]
    }
  ],
  education: [
    {
      title: 'Systems Engineer',
      institution: 'University of Pamplona',
      year: '2019',
      status: 'completed'
    },
    {
      title: 'Master in IT Project Management',
      institution: 'University of Pamplona',
      year: '',
      status: 'in_progress'
    }
  ],
  certifications: [
    {
      name: 'AZ-104: Azure Administrator Associate',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/es-mx/RonalMauricioGelvezRuiz-6033/D147A1CA96A8C62F?sharingId=2D6F133A2202099E'
    },
    {
      name: 'AZ-900: Azure Fundamentals',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/es-mx/RonalMauricioGelvezRuiz-6033/C472ED32048C8FFB?sharingId=2D6F133A2202099E'
    }
  ],
  aptitudes: [
    'SOLID Best Practices',
    'SCRUM Agile Frameworks',
    'Development Team Management',
    'Clean Code / Clean Architecture'
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Intermediate' }
  ]
};

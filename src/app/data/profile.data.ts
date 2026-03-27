import { Profile } from '../models/profile.model';

export const PROFILE_DATA: Profile = {
  name: 'Ronal Mauricio Gelvez Ruiz',
  role: 'Software Developer .NET - Azure',
  avatarUrl: 'https://1.gravatar.com/userimage/176784774/ef2c6ad44cfcca2fa55d3919c35ff992?size=400',
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/rmgelvez',
      icon: 'github'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rmgelvez',
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
    '.NET / .NET Core / Entity Framework',
    'Azure Services',
    'SQL Server / MySQL / PostgreSQL',
    'MongoDB',
    'GIT / GIT Flow',
    'Angular',
    'JavaScript / TypeScript',
    'HTML / CSS',
    'Docker',
    'Xunit / Nunit'
  ],
  experience: [
    {
      company: 'Neoris',
      role: 'Experienced Developer .NET',
      startDate: 'Aug 2021',
      endDate: null,
      highlights: [
        'Non-relational data analysis and management in MongoDB',
        'Maintenance and development for ETB telecommunications platform (.NET Framework, JavaScript, Angular)',
        'API-REST services development',
        'AliPay miniprograms and libraries for Claro Superapp',
        'Planning and coordination of the development team'
      ]
    },
    {
      company: 'Ingeneo S.A.S',
      role: 'Software Developer .NET',
      startDate: 'May 2021',
      endDate: 'Aug 2021',
      highlights: [
        '.NET web solutions for guarantee administration',
        'DevOps with Azure platform',
        'SOAP services development',
        'Server management with SharePoint'
      ]
    },
    {
      company: 'Neptuno Smart System S.A.S',
      role: 'Development Engineer',
      startDate: 'Apr 2019',
      endDate: 'May 2021',
      highlights: [
        '.NET web solutions for national transits (ASP.NET Core, Clean Architecture, Azure)',
        'DevOps with Azure platform',
        'API-REST development',
        'Cloud services: App Services, Logic Apps, Databases, Account Storages'
      ]
    }
  ],
  education: [
    {
      title: 'Systems Engineer',
      institution: 'Pamplona University',
      year: '2019',
      status: 'completed'
    },
    {
      title: 'Master IT Project Management',
      institution: 'Pamplona University',
      year: '',
      status: 'in_progress'
    }
  ],
  certifications: [
    {
      name: 'Azure Fundamentals',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/es-mx/RonalMauricioGelvezRuiz-6033/C472ED32048C8FFB?sharingId=2D6F133A2202099E'
    },
    {
      name: 'Azure Administrator Associate',
      credentialUrl: 'https://learn.microsoft.com/api/credentials/share/es-mx/RonalMauricioGelvezRuiz-6033/D147A1CA96A8C62F?sharingId=2D6F133A2202099E'
    }
  ],
  aptitudes: [
    'SOLID Principles',
    'Agile Frameworks',
    'Clean Code',
    'Development Leader'
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Intermediate' }
  ]
};

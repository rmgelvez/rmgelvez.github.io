import { Profile } from '../models/profile.model';

export const PROFILE_DATA_ES: Profile = {
  name: 'Ronal Mauricio Gelvez Ruiz',
  role: 'Ingeniero de Sistemas - Desarrollador Senior .NET / Azure',
  about: 'Como Desarrollador de Software .Net/Azure, me apasiona la tecnología y cómo ésta nos ayuda a resolver problemas. Mi objetivo es generar conocimiento y aprender continuamente de las herramientas de vanguardia y las técnicas para contribuir a la Ingeniería del Software.',
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
    'Net / Net Core / Net Framework',
    'Entity Framework',
    'Servicios Azure',
    'SQL server / MySql / PosgreSQL',
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
      role: 'Desarrollador Senior',
      startDate: 'Dic 2024',
      endDate: null,
      highlights: [
        'Desarrollo y optimización de miniprogramas en la SuperApp de Claro Colombia (Framework Alipay)',
        'Análisis, soporte y mantenimiento del aplicativo web de facturación de EPM con Angular',
        'Implementación de pruebas unitarias y patrones de diseño para soluciones escalables',
        'Gestión del ciclo de desarrollo mediante Azure DevOps (Scrum, pipelines y seguridad)',
        'Aplicación de arquitectura limpia y principios SOLID'
      ]
    },
    {
      company: 'Neoris',
      role: 'Desarrollador Experimentado',
      startDate: 'Ago 2021',
      endDate: 'Dic 2024',
      highlights: [
        'Desarrollo y mantenimiento de plataformas tecnológicas de gestión para ETB',
        'Desarrollo de microservicios en .Net Core y Mongo con Docker y servicios de eventos',
        'Desarrollo de aplicaciones móviles para Claro usando Miniprograms',
        'Administración de Servicios Azure y bases de datos SQL Server/MongoDB',
        'Integración y despliegue continuo (CI/CD)'
      ]
    },
    {
      company: 'Ingeneo S.A.S',
      role: 'Desarrollador de Software .NET',
      startDate: 'May 2021',
      endDate: 'Ago 2021',
      highlights: [
        'Desarrollo de nuevas funcionalidades para aplicativo de gestión de garantías',
        'Consumo de servicios SOAP',
        'Uso de .Net Framework y la nube de Azure',
        'Devops y SCRUM con Azure'
      ]
    },
    {
      company: 'Neptuno Smart System S.A.S',
      role: 'Ingeniero de Desarrollo',
      startDate: 'Abr 2019',
      endDate: 'May 2021',
      highlights: [
        'Soluciones web en .Net para gestión de tránsitos nacionales',
        'Implementación de servicios cloud: App Services, Logic Apps y Storage Accounts',
        'Desarrollo de Api-Rest y seguridad (autenticación y biométricos)',
        'Devops con Azure (CI/CD)'
      ]
    }
  ],
  education: [
    {
      title: 'Ingeniero en Sistemas',
      institution: 'Universidad De Pamplona',
      year: '2019',
      status: 'completed'
    },
    {
      title: 'Maestría en Gestión de Proyectos Informáticos',
      institution: 'Universidad De Pamplona',
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
    'Buenas prácticas SOLID',
    'Marcos de trabajo ágiles SCRUM',
    'Gestión de equipos de desarrollo',
    'Código Limpio / Arquitectura Limpia'
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio' }
  ]
};
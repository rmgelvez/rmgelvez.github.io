export interface Profile {
  name: string;
  role: string;
  about: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  aptitudes: string[];
  languages: Language[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface Education {
  title: string;
  institution: string;
  year: string;
  status: 'completed' | 'in_progress';
}

export interface Certification {
  name: string;
  credentialUrl: string;
}

export interface Language {
  name: string;
  level: string;
}

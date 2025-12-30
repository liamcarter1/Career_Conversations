
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
}

export interface SocialLinks {
  linkedIn: string;
  github: string;
}

export interface CareerContext {
  name: string;
  title: string;
  bio: string;
  profileImageUrl?: string;
  skills: Skill[];
  coreCompetencies: string[];
  experience: Experience[];
  projects: Project[];
  socials: SocialLinks;
  detailedResumeContext: string;
  projectDeepDiveContext: string;
  adminPassword?: string;
}

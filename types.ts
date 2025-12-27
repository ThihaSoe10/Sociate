export enum Language {
  ENGLISH = 'en',
  MYANMAR = 'mm'
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface SocialPost {
  id: string;
  content: string;
  platforms: ('facebook' | 'instagram' | 'telegram' | 'linkedin')[];
  status: 'draft' | 'scheduled' | 'published';
  scheduled_at?: string;
  created_at: string;
}

export interface NavItem {
  label_en: string;
  label_mm: string;
  icon: string;
  id: string;
}

export type ViewState = 'dashboard' | 'create' | 'calendar' | 'analytics' | 'settings';

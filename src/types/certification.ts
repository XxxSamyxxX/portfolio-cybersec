export interface ContentBlockItem {
  icon?: string;
  text: string;
}

export interface ContentBlock {
  title: string;
  items: ContentBlockItem[];
}

export interface Certification {
  id?: string;
  title: string;
  slug: string;
  provider: string;
  description: string;
  long_description?: string;
  date_obtained?: string;
  date_display?: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  skills: string[];
  content_blocks?: ContentBlock[];
  learning_outcomes?: string[];
  certificate_url?: string;
  verification_url?: string;
  badge_image?: string;
  color: string;
  display_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

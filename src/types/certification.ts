export interface Certification {
  id?: string;
  title: string;
  slug: string;
  provider: string;
  description: string;
  long_description?: string;
  date_obtained?: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  skills: string[];
  certificate_url?: string;
  badge_image?: string;
  color: string;
  display_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

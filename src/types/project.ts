export type ProjectType = 'article' | 'showcase';

export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  long_description?: string; // DB column name
  tags: string[];
  image: string;
  features: string[];
  technicalDetails?: string[];
  technical_details?: string[]; // DB column name
  githubUrl?: string;
  github_url?: string; // DB column name
  demoUrl?: string;
  demo_url?: string; // DB column name
  status: 'completed' | 'in-progress';
  timeline?: string;
  articleUrl?: string;
  article_url?: string; // DB column name
  project_type: ProjectType; // 'article' = page dédiée, 'showcase' = modal
  projectType?: ProjectType; // alias camelCase
  display_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Helper to normalize project data from DB
export function normalizeProject(p: Project): Project {
  return {
    ...p,
    longDescription: p.long_description || p.longDescription,
    technicalDetails: p.technical_details || p.technicalDetails || [],
    githubUrl: p.github_url || p.githubUrl,
    demoUrl: p.demo_url || p.demoUrl,
    articleUrl: p.article_url || p.articleUrl,
    projectType: p.project_type || p.projectType || 'showcase',
  };
}

// Helper to check if project is an article
export function isArticle(p: Project): boolean {
  return (p.project_type || p.projectType) === 'article';
}

// Helper to check if project is a showcase
export function isShowcase(p: Project): boolean {
  return (p.project_type || p.projectType) === 'showcase';
}
import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';
import type { Project } from '../types/project';
import type { Article, ArticleSection } from '../types/article';

// ============================================
// PROJECTS HOOKS
// ============================================

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes for projects
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async (): Promise<Project | null> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    },
    enabled: !!slug,
  });
}

// ============================================
// ARTICLES HOOKS
// ============================================

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes for articles list
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async (): Promise<Article | null> => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

// LAZY LOADING: Only fetch sections when needed
export function useArticleSections(articleId: string | undefined) {
  return useQuery({
    queryKey: ['article-sections', articleId],
    queryFn: async (): Promise<ArticleSection[]> => {
      if (!articleId) return [];
      
      const { data, error } = await supabase
        .from('article_sections')
        .select('*')
        .eq('article_id', articleId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!articleId,
    staleTime: 15 * 60 * 1000, // 15 minutes for sections (they change less often)
  });
}

// Fetch single section on demand (for lazy loading tabs)
export function useArticleSection(sectionId: string | undefined) {
  return useQuery({
    queryKey: ['article-section', sectionId],
    queryFn: async (): Promise<ArticleSection | null> => {
      if (!sectionId) return null;
      
      const { data, error } = await supabase
        .from('article_sections')
        .select('*')
        .eq('id', sectionId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },
    enabled: !!sectionId,
    staleTime: 15 * 60 * 1000,
  });
}

// ============================================
// COMBINED DATA HOOKS
// ============================================

// Combined projects + articles for homepage
export function useAllShowcaseItems() {
  const projectsQuery = useProjects();
  const articlesQuery = useArticles();

  const isLoading = projectsQuery.isLoading || articlesQuery.isLoading;
  const error = projectsQuery.error || articlesQuery.error;

  const items = [...(projectsQuery.data || []), ...(articlesQuery.data || [])].sort(
    (a, b) => (a.display_order || 0) - (b.display_order || 0)
  );

  return {
    data: items,
    isLoading,
    error,
  };
}

// ============================================
// CERTIFICATIONS HOOKS
// ============================================

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes for certifications (very static)
  });
}

// ============================================
// WRITEUPS HOOKS
// ============================================

export function useWriteups() {
  return useQuery({
    queryKey: ['writeups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useWriteup(slug: string) {
  return useQuery({
    queryKey: ['writeup', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },
    enabled: !!slug,
  });
}

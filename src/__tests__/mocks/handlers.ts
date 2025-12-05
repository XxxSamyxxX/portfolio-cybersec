import { http, HttpResponse } from 'msw';

// Mock data
export const mockProjects = [
  {
    id: '1',
    title: 'Security Dashboard',
    description: 'A cybersecurity monitoring dashboard',
    image: 'https://example.com/image1.jpg',
    tags: ['React', 'TypeScript', 'Security'],
    status: 'completed',
    published: true,
    display_order: 1,
    github_url: 'https://github.com/example/project1',
    demo_url: 'https://demo.example.com',
  },
  {
    id: '2',
    title: 'Vulnerability Scanner',
    description: 'Automated vulnerability detection tool',
    image: 'https://example.com/image2.jpg',
    tags: ['Python', 'Security', 'Automation'],
    status: 'in-progress',
    published: true,
    display_order: 2,
    github_url: 'https://github.com/example/project2',
  },
];

export const mockArticles = [
  {
    id: '1',
    title: 'Getting Started with Pentesting',
    slug: 'getting-started-pentesting',
    description: 'A beginner guide to penetration testing',
    icon: 'shield',
    published: true,
    display_order: 1,
  },
  {
    id: '2',
    title: 'Linux Fundamentals',
    slug: 'linux-fundamentals',
    description: 'Essential Linux skills for security',
    icon: 'terminal',
    published: true,
    display_order: 2,
  },
];

export const mockArticleSections = [
  {
    id: '1',
    article_id: '1',
    tab_id: 'overview',
    tab_label: 'Overview',
    content: '# Overview\n\nThis is the overview section.',
    display_order: 1,
  },
  {
    id: '2',
    article_id: '1',
    tab_id: 'tools',
    tab_label: 'Tools',
    content: '# Tools\n\nList of essential tools.',
    display_order: 2,
  },
];

export const mockWriteups = [
  {
    id: '1',
    title: 'HackTheBox - Machine Name',
    slug: 'htb-machine-name',
    platform: 'HackTheBox',
    difficulty: 'Medium',
    points: 30,
    published: true,
    created_at: '2024-01-15T00:00:00Z',
  },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';

export const handlers = [
  // Projects endpoint
  http.get(`${SUPABASE_URL}/rest/v1/projects`, ({ request }) => {
    const url = new URL(request.url);
    const published = url.searchParams.get('published');
    
    let data = mockProjects;
    if (published === 'eq.true') {
      data = mockProjects.filter(p => p.published);
    }
    
    return HttpResponse.json(data);
  }),

  // Articles endpoint
  http.get(`${SUPABASE_URL}/rest/v1/articles`, ({ request }) => {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (slug) {
      const article = mockArticles.find(a => `eq.${a.slug}` === slug);
      return HttpResponse.json(article ? [article] : []);
    }
    
    return HttpResponse.json(mockArticles);
  }),

  // Article sections endpoint
  http.get(`${SUPABASE_URL}/rest/v1/article_sections`, ({ request }) => {
    const url = new URL(request.url);
    const articleId = url.searchParams.get('article_id');
    
    if (articleId) {
      const sections = mockArticleSections.filter(
        s => `eq.${s.article_id}` === articleId
      );
      return HttpResponse.json(sections);
    }
    
    return HttpResponse.json(mockArticleSections);
  }),

  // Writeups endpoint
  http.get(`${SUPABASE_URL}/rest/v1/writeups`, () => {
    return HttpResponse.json(mockWriteups);
  }),

  // Certifications endpoint
  http.get(`${SUPABASE_URL}/rest/v1/certifications`, () => {
    return HttpResponse.json([]);
  }),
];

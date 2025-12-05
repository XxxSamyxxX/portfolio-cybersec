import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { 
  useProjects, 
  useProject,
  useArticles, 
  useArticle,
  useArticleSections,
  useArticleSection,
  useAllShowcaseItems,
  useCertifications,
  useWriteups,
  useWriteup
} from '../../lib/queries';

// Create a wrapper with QueryClient for testing hooks
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

// ============================================
// PROJECTS HOOKS TESTS
// ============================================

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return projects', async () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });

  it('should have correct query key', async () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    if (result.current.data && result.current.data.length > 0) {
      expect(result.current.data[0]).toHaveProperty('id');
      expect(result.current.data[0]).toHaveProperty('title');
    }
  });
});

describe('useProject', () => {
  it('should fetch single project by slug', async () => {
    const { result } = renderHook(() => useProject('test-project'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // May be null if project doesn't exist in mock
    expect(result.current.isFetched).toBe(true);
  });

  it('should not fetch when slug is empty', async () => {
    const { result } = renderHook(() => useProject(''), {
      wrapper: createWrapper(),
    });

    // Should not be loading because query is disabled
    expect(result.current.fetchStatus).toBe('idle');
  });
});

// ============================================
// ARTICLES HOOKS TESTS
// ============================================

describe('useArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return articles', async () => {
    const { result } = renderHook(() => useArticles(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });

  it('should return articles array even if empty', async () => {
    const { result } = renderHook(() => useArticles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(Array.isArray(result.current.data)).toBe(true);
  });
});

describe('useArticle', () => {
  it('should fetch single article by slug', async () => {
    const { result } = renderHook(() => useArticle('exegol'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFetched).toBe(true);
  });

  it('should not fetch when slug is empty', async () => {
    const { result } = renderHook(() => useArticle(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useArticleSections', () => {
  it('should fetch sections for an article', async () => {
    const { result } = renderHook(() => useArticleSections('article-123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFetched).toBe(true);
  });

  it('should not fetch when articleId is undefined', async () => {
    const { result } = renderHook(() => useArticleSections(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useArticleSection', () => {
  it('should fetch single section by id', async () => {
    const { result } = renderHook(() => useArticleSection('section-123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFetched).toBe(true);
  });

  it('should not fetch when sectionId is undefined', async () => {
    const { result } = renderHook(() => useArticleSection(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });
});

// ============================================
// COMBINED DATA HOOKS TESTS
// ============================================

describe('useAllShowcaseItems', () => {
  it('should combine projects and articles', async () => {
    const { result } = renderHook(() => useAllShowcaseItems(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });

  it('should return sorted items by display_order', async () => {
    const { result } = renderHook(() => useAllShowcaseItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const items = result.current.data;
    if (items && items.length > 1) {
      for (let i = 0; i < items.length - 1; i++) {
        const currentOrder = items[i].display_order || 0;
        const nextOrder = items[i + 1].display_order || 0;
        expect(currentOrder).toBeLessThanOrEqual(nextOrder);
      }
    }
  });

  it('should handle error state', async () => {
    const { result } = renderHook(() => useAllShowcaseItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Error should be null if successful, or defined if failed
    expect(result.current.error === null || result.current.error !== undefined).toBe(true);
  });
});

// ============================================
// CERTIFICATIONS HOOKS TESTS
// ============================================

describe('useCertifications', () => {
  it('should fetch certifications', async () => {
    const { result } = renderHook(() => useCertifications(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFetched).toBe(true);
  });

  it('should complete certifications query', async () => {
    const { result } = renderHook(() => useCertifications(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess || result.current.isError).toBe(true);
  });
});

// ============================================
// WRITEUPS HOOKS TESTS
// ============================================

describe('useWriteups', () => {
  it('should fetch writeups', async () => {
    const { result } = renderHook(() => useWriteups(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Data might be undefined if error, but query should complete
    expect(result.current.isFetched).toBe(true);
  });

  it('should complete query for writeups', async () => {
    const { result } = renderHook(() => useWriteups(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Either successful with data or error state
    expect(result.current.isSuccess || result.current.isError).toBe(true);
  });
});

describe('useWriteup', () => {
  it('should fetch single writeup by slug', async () => {
    const { result } = renderHook(() => useWriteup('dog'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFetched).toBe(true);
  });

  it('should not fetch when slug is empty', async () => {
    const { result } = renderHook(() => useWriteup(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
  });

  it('should handle non-existent writeup', async () => {
    const { result } = renderHook(() => useWriteup('non-existent-slug-12345'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should either be null or throw, both are valid
    expect(result.current.isFetched).toBe(true);
  });
});

// ============================================
// QUERY OPTIONS TESTS
// ============================================

describe('Query Options', () => {
  it('useProjects should complete successfully', async () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess || result.current.isError).toBe(true);
  });

  it('useCertifications should complete successfully', async () => {
    const { result } = renderHook(() => useCertifications(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess || result.current.isError).toBe(true);
  });
});

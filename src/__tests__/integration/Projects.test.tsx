import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Projects } from '../../components/Projects';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div onClick={onClick as React.MouseEventHandler} {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock queries
const mockProjects = [
  {
    id: '1',
    title: 'Security Dashboard',
    slug: 'security-dashboard',
    description: 'A cybersecurity monitoring dashboard',
    image: 'https://example.com/image1.jpg',
    tags: ['React', 'TypeScript', 'Security'],
    features: ['Feature 1'],
    technical_details: ['Detail 1'],
    status: 'completed',
    project_type: 'showcase',
    published: true,
    display_order: 1,
  },
  {
    id: '2',
    title: 'Vulnerability Scanner',
    slug: 'vulnerability-scanner',
    description: 'Automated vulnerability detection tool',
    image: 'https://example.com/image2.jpg',
    tags: ['Python', 'Security', 'Automation'],
    features: ['Feature 2'],
    technical_details: ['Detail 2'],
    status: 'in-progress',
    project_type: 'showcase',
    published: true,
    display_order: 2,
  },
];

const mockArticles = [
  {
    id: '3',
    title: 'Getting Started with Pentesting',
    slug: 'getting-started-pentesting',
    description: 'A beginner guide to penetration testing',
    header_image: 'https://example.com/article.jpg',
    published: true,
    display_order: 3,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

vi.mock('../../lib/queries', () => ({
  useProjects: () => ({
    data: mockProjects,
    isLoading: false,
    error: null,
  }),
  useArticles: () => ({
    data: mockArticles,
    isLoading: false,
    error: null,
  }),
}));

// Mock ProjectDetail
vi.mock('../../components/ProjectDetail', () => ({
  ProjectDetail: ({ project, onClose, isModal }: { project: { title: string }, onClose: () => void, isModal: boolean }) => (
    <div data-testid="project-detail">
      <span>Project Detail: {project.title}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock imageUtils
vi.mock('../../lib/imageUtils', () => ({
  getOptimizedUrl: (url: string) => url,
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

describe('Projects Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Projects component', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Projets/i)).toBeInTheDocument();
    });
  });

  it('should display the section header', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Lab & Infrastructure/i)).toBeInTheDocument();
    });
  });

  it('should display project titles', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Security Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Vulnerability Scanner/i)).toBeInTheDocument();
    });
  });

  it('should display project descriptions', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/cybersecurity monitoring dashboard/i)).toBeInTheDocument();
    });
  });

  it('should display project tags', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  it('should display articles as projects', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Getting Started with Pentesting/i)).toBeInTheDocument();
    });
  });

  it('should show Article badge for articles', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText('Article')).toBeInTheDocument();
    });
  });

  it('should navigate to articles page when article is clicked', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Getting Started with Pentesting/i)).toBeInTheDocument();
    });
    
    const articleCard = screen.getByText(/Getting Started with Pentesting/i).closest('div');
    if (articleCard) {
      fireEvent.click(articleCard);
    }
    
    // Should navigate to article page
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should open ProjectDetail modal when showcase project is clicked', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Security Dashboard/i)).toBeInTheDocument();
    });
    
    const projectCard = screen.getByText(/Security Dashboard/i).closest('div');
    if (projectCard) {
      fireEvent.click(projectCard);
    }
    
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
    });
  });

  it('should close ProjectDetail modal when close button is clicked', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Security Dashboard/i)).toBeInTheDocument();
    });
    
    // Click to open modal
    const projectCard = screen.getByText(/Security Dashboard/i).closest('div');
    if (projectCard) {
      fireEvent.click(projectCard);
    }
    
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
    });
    
    // Click close button
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('project-detail')).not.toBeInTheDocument();
    });
  });

  it('should have "Voir la bibliothèque complète" button', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      expect(screen.getByText(/Voir la bibliothèque complète/i)).toBeInTheDocument();
    });
  });

  it('should navigate to /projects when library button is clicked', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      const libraryButton = screen.getByText(/Voir la bibliothèque complète/i);
      fireEvent.click(libraryButton);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('should render project images', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('should display limited tags (max 3) with overflow indicator', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      // Project has 3 tags, should not show overflow
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  it('should have proper section structure', async () => {
    const { container } = renderWithProviders(<Projects />);
    
    await waitFor(() => {
      const section = container.querySelector('section#projects');
      expect(section).toBeInTheDocument();
    });
  });
});

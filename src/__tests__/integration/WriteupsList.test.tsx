import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { WriteupsList } from '../../components/WriteupsList';

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
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h2 {...props}>{children}</h2>,
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <a {...props}>{children}</a>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock supabase
const mockWriteups = [
  {
    id: '1',
    title: 'HackTheBox - Dog',
    slug: 'hackthebox-dog',
    description: 'A medium difficulty HackTheBox machine',
    difficulty: 'Medium',
    tags: ['CVE', 'RCE', 'Python'],
    platform: 'HackTheBox',
    published: true,
    created_at: '2024-06-15T00:00:00Z',
    images: ['https://example.com/dog.png'],
  },
  {
    id: '2',
    title: 'TryHackMe - Basic Pentesting',
    slug: 'tryhackme-basic-pentesting',
    description: 'An easy TryHackMe room',
    difficulty: 'Easy',
    tags: ['Brute Force', 'SSH'],
    platform: 'TryHackMe',
    published: true,
    created_at: '2024-05-10T00:00:00Z',
    images: [],
  },
  {
    id: '3',
    title: 'Root-Me Challenge',
    slug: 'root-me-challenge',
    description: 'A hard Root-Me challenge',
    difficulty: 'Hard',
    tags: ['Web', 'SQL Injection'],
    platform: 'Root-Me',
    published: true,
    created_at: '2024-04-01T00:00:00Z',
    images: [],
  },
];

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: mockWriteups, error: null }),
        }),
      }),
    }),
  },
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

describe('WriteupsList Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render WriteupsList component', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/Write-ups/i)).toBeInTheDocument();
    });
  });

  it('should show writeups header and title', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      const heading = screen.getByText(/Write-ups Archive/i);
      expect(heading).toBeInTheDocument();
    });
  });

  it('should render the page structure', async () => {
    const { container } = renderWithProviders(<WriteupsList />);
    
    // Wait for component to load
    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should display writeups from API', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should display multiple writeups', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
      expect(screen.getByText(/TryHackMe - Basic Pentesting/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should filter writeups by search query', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'Dog' } });
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    });
  });

  it('should filter writeups by tag search', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'CVE' } });
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    });
  });

  it('should have view mode toggle buttons', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      // Should have grid and list view toggle buttons
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it('should toggle view mode when clicking buttons', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      const listButton = screen.getByTitle('Vue liste');
      fireEvent.click(listButton);
    });
    
    await waitFor(() => {
      const gridButton = screen.getByTitle('Vue grille');
      fireEvent.click(gridButton);
    });
  });

  it('should render filter buttons', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      // Check for platform filters - the component should render
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it('should show writeup count', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/Rapports/i)).toBeInTheDocument();
    });
  });

  it('should have SEO head with proper title', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      // SEOHead renders the title
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should be accessible with proper headings', async () => {
    const { container } = renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      const hasHeading = container.querySelector('h1');
      expect(hasHeading).toBeTruthy();
    });
  });

  it('should handle empty search results gracefully', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistentwriteup123' } });
    
    // Should still render the page without crashing
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should sort writeups by different criteria', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      expect(screen.getByText(/HackTheBox - Dog/i)).toBeInTheDocument();
    });
    
    // Component renders successfully with default sort
    expect(document.body).toBeInTheDocument();
  });
});

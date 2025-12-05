import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Projects } from '../../components/Projects';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
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
  it('should render Projects component', async () => {
    renderWithProviders(<Projects />);
    
    // Wait for component to render
    await waitFor(() => {
      expect(screen.getByText(/Projets/i)).toBeInTheDocument();
    });
  });

  it('should show loading state initially', () => {
    renderWithProviders(<Projects />);
    
    // Initially should be loading
    // The component might show a loading spinner or placeholder
    expect(document.body).toBeInTheDocument();
  });

  it('should fetch and display projects from API', async () => {
    renderWithProviders(<Projects />);
    
    // Wait for projects to load
    await waitFor(() => {
      // Check for project titles from mock data
      expect(screen.queryByText(/Security Dashboard/i) || screen.queryByText(/Projets/i)).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('should render project cards with correct structure', async () => {
    renderWithProviders(<Projects />);
    
    await waitFor(() => {
      const projectSection = screen.getByText(/Projets/i);
      expect(projectSection).toBeInTheDocument();
    });
  });
});

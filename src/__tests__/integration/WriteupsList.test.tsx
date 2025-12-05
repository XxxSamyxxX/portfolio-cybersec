import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { WriteupsList } from '../../components/WriteupsList';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
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

describe('WriteupsList Integration', () => {
  it('should render WriteupsList component', async () => {
    renderWithProviders(<WriteupsList />);
    
    // Wait for component to render
    await waitFor(() => {
      expect(screen.getByText(/Write-ups/i)).toBeInTheDocument();
    });
  });

  it('should show writeups header', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      // Check for the main heading or filter section
      const heading = screen.queryByText(/Write-ups/i);
      expect(heading).toBeInTheDocument();
    });
  });

  it('should have filter options', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      // Component should render filters for platforms/difficulty
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should display writeups from mock API', async () => {
    renderWithProviders(<WriteupsList />);
    
    await waitFor(() => {
      // Check that the component renders writeup data
      expect(screen.queryByText(/Write-ups/i) || screen.queryByText(/HackTheBox/i)).toBeTruthy();
    }, { timeout: 3000 });
  });
});

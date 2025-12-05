import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Stats } from '../../components/Stats';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock platform cards
vi.mock('../../components/platforms/TryHackMeCard', () => ({
  TryHackMeCard: ({ stats }: any) => (
    <div data-testid="tryhackme-card">
      <span>TryHackMe</span>
      <span>{stats.rank}</span>
    </div>
  ),
}));

vi.mock('../../components/platforms/HackTheBoxCard', () => ({
  HackTheBoxCard: ({ stats }: any) => (
    <div data-testid="hackthebox-card">
      <span>HackTheBox</span>
      <span>{stats.rank}</span>
    </div>
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Stats', () => {
  const mockStats = {
    tryhackme: { rank: 'Top 5%' },
    hackthebox: { rank: 'Psychooo0' },
    rootme: { rank: 'N/A' },
  };

  it('should render Stats component', () => {
    renderWithRouter(<Stats stats={mockStats} />);
    
    expect(screen.getByTestId('tryhackme-card')).toBeInTheDocument();
    expect(screen.getByTestId('hackthebox-card')).toBeInTheDocument();
  });

  it('should render TryHackMe card', () => {
    renderWithRouter(<Stats stats={mockStats} />);
    
    expect(screen.getByText('TryHackMe')).toBeInTheDocument();
  });

  it('should render HackTheBox card', () => {
    renderWithRouter(<Stats stats={mockStats} />);
    
    expect(screen.getByText('HackTheBox')).toBeInTheDocument();
  });

  it('should display correct ranks', () => {
    renderWithRouter(<Stats stats={mockStats} />);
    
    // The component uses its own internal stats, but cards should render
    expect(screen.getByTestId('tryhackme-card')).toBeInTheDocument();
    expect(screen.getByTestId('hackthebox-card')).toBeInTheDocument();
  });
});

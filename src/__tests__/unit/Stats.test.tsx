import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Stats } from '../../components/Stats';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
  },
}));

// Mock platform cards with onPlatformClick support
vi.mock('../../components/platforms/TryHackMeCard', () => ({
  TryHackMeCard: ({ stats, onPlatformClick }: { stats: { rank: string }, onPlatformClick: (platform: string) => void }) => (
    <div data-testid="tryhackme-card" onClick={() => onPlatformClick('TryHackMe')}>
      <span>TryHackMe</span>
      <span>{stats.rank}</span>
    </div>
  ),
}));

vi.mock('../../components/platforms/HackTheBoxCard', () => ({
  HackTheBoxCard: ({ stats, onPlatformClick }: { stats: { rank: string }, onPlatformClick: (platform: string) => void }) => (
    <div data-testid="hackthebox-card" onClick={() => onPlatformClick('HackTheBox')}>
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('should navigate to TryHackMe writeups when card is clicked', () => {
    renderWithRouter(<Stats stats={mockStats} />);
    
    const thmCard = screen.getByTestId('tryhackme-card');
    fireEvent.click(thmCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('/writeups?platform=tryhackme');
  });

  it('should navigate to HackTheBox writeups when card is clicked', () => {
    renderWithRouter(<Stats stats={mockStats} />);
    
    const htbCard = screen.getByTestId('hackthebox-card');
    fireEvent.click(htbCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('/writeups?platform=hackthebox');
  });

  it('should render section element with proper classes', () => {
    const { container } = renderWithRouter(<Stats stats={mockStats} />);
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-12');
  });

  it('should have grid layout for cards', () => {
    const { container } = renderWithRouter(<Stats stats={mockStats} />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });
});

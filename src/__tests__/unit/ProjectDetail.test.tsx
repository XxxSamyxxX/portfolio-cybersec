import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ProjectDetail } from '../../components/ProjectDetail';
import { Project } from '../../types/project';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock ModalPortal
vi.mock('../../components/ModalPortal', () => ({
  ModalPortal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal-portal">{children}</div>
  ),
}));

// Mock imageUtils
vi.mock('../../lib/imageUtils', () => ({
  getOptimizedUrl: (url: string) => url,
}));

const createMockProject = (overrides: Partial<Project> = {}): Project => ({
  id: '1',
  title: 'Test Project',
  slug: 'test-project',
  description: 'A test project description',
  longDescription: 'A longer description of the test project with more details.',
  image: 'https://example.com/image.jpg',
  tags: ['React', 'TypeScript', 'Testing'],
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  technicalDetails: ['Detail 1', 'Detail 2'],
  status: 'completed',
  timeline: 'Jan 2024 - Present',
  projectType: 'showcase',
  displayOrder: 1,
  published: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
  ...overrides,
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProjectDetail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Non-modal rendering', () => {
    it('should render project title', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    it('should render project tags', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('should render project status as completed', () => {
      const project = createMockProject({ status: 'completed' });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('Projet Terminé')).toBeInTheDocument();
    });

    it('should render project status as in-progress', () => {
      const project = createMockProject({ status: 'in-progress' });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('En Développement')).toBeInTheDocument();
    });

    it('should render timeline', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('Jan 2024 - Present')).toBeInTheDocument();
    });

    it('should render long description', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText(/longer description/i)).toBeInTheDocument();
    });

    it('should render features', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
    });

    it('should render technical details', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText('Détails Techniques')).toBeInTheDocument();
      expect(screen.getByText('Detail 1')).toBeInTheDocument();
      expect(screen.getByText('Detail 2')).toBeInTheDocument();
    });

    it('should render GitHub link when available', () => {
      const project = createMockProject({
        githubUrl: 'https://github.com/example/project',
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      const githubLink = screen.getByRole('link', { name: /code source/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/example/project');
      expect(githubLink).toHaveAttribute('target', '_blank');
    });

    it('should render demo link when available', () => {
      const project = createMockProject({
        demoUrl: 'https://demo.example.com',
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      const demoLink = screen.getByRole('link', { name: /voir le projet/i });
      expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
      expect(demoLink).toHaveAttribute('target', '_blank');
    });

    it('should render article button when articleUrl is present and not modal', () => {
      const project = createMockProject({
        articleUrl: '/articles/test-article',
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.getByText(/lire l'article complet/i)).toBeInTheDocument();
    });

    it('should navigate when article button is clicked', () => {
      const project = createMockProject({
        articleUrl: '/articles/test-article',
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      const articleButton = screen.getByText(/lire l'article complet/i);
      fireEvent.click(articleButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/articles/test-article');
    });

    it('should render project image', () => {
      const project = createMockProject();
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Test Project');
    });
  });

  describe('Modal rendering', () => {
    it('should render within ModalPortal when isModal is true', () => {
      const project = createMockProject();
      const mockOnClose = vi.fn();
      
      renderWithRouter(
        <ProjectDetail project={project} isModal={true} onClose={mockOnClose} />
      );
      
      expect(screen.getByTestId('modal-portal')).toBeInTheDocument();
    });

    it('should call onClose when backdrop is clicked', () => {
      const project = createMockProject();
      const mockOnClose = vi.fn();
      
      renderWithRouter(
        <ProjectDetail project={project} isModal={true} onClose={mockOnClose} />
      );
      
      // Click on the backdrop
      const backdrop = screen.getByTestId('modal-portal').querySelector('.fixed');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(mockOnClose).toHaveBeenCalled();
      }
    });

    it('should not call onClose when modal content is clicked', () => {
      const project = createMockProject();
      const mockOnClose = vi.fn();
      
      renderWithRouter(
        <ProjectDetail project={project} isModal={true} onClose={mockOnClose} />
      );
      
      // Click on the modal content (project title)
      fireEvent.click(screen.getByText('Test Project'));
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should have close button in modal', () => {
      const project = createMockProject();
      const mockOnClose = vi.fn();
      
      const { container } = renderWithRouter(
        <ProjectDetail project={project} isModal={true} onClose={mockOnClose} />
      );
      
      // Find close button by looking for button with X icon
      const closeButton = container.querySelector('button');
      expect(closeButton).toBeInTheDocument();
    });

    it('should not show "Lire l\'article complet" button in modal mode', () => {
      const project = createMockProject({
        articleUrl: '/articles/test-article',
      });
      
      renderWithRouter(
        <ProjectDetail project={project} isModal={true} onClose={() => {}} />
      );
      
      // The "Voir l'article" button should exist but not "Lire l'article complet"
      expect(screen.queryByText(/lire l'article complet/i)).not.toBeInTheDocument();
    });

    it('should show "Voir l\'article" button in header when articleUrl is present', () => {
      const project = createMockProject({
        articleUrl: '/articles/test-article',
      });
      
      renderWithRouter(
        <ProjectDetail project={project} isModal={true} onClose={() => {}} />
      );
      
      // Should have the header button
      expect(screen.getByText(/voir l'article/i)).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle project with no github url', () => {
      const project = createMockProject({
        githubUrl: undefined,
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.queryByText(/code source/i)).not.toBeInTheDocument();
    });

    it('should handle project with no demo url', () => {
      const project = createMockProject({
        demoUrl: undefined,
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.queryByText(/voir le projet/i)).not.toBeInTheDocument();
    });

    it('should handle project with no article url', () => {
      const project = createMockProject({
        articleUrl: undefined,
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      expect(screen.queryByText(/lire l'article/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/voir l'article/i)).not.toBeInTheDocument();
    });

    it('should handle empty features array', () => {
      const project = createMockProject({
        features: [],
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      // Section should still exist but be empty
      expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
    });

    it('should handle empty technical details array', () => {
      const project = createMockProject({
        technicalDetails: [],
      });
      renderWithRouter(<ProjectDetail project={project} isModal={false} />);
      
      // Section should still exist but be empty
      expect(screen.getByText('Détails Techniques')).toBeInTheDocument();
    });
  });
});

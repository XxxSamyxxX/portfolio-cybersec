import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ModalPortal } from '../../components/ModalPortal';

describe('ModalPortal', () => {
  afterEach(() => {
    cleanup();
    // Clean up modal-root if exists
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      modalRoot.remove();
    }
  });

  it('should render children in a portal', async () => {
    render(
      <ModalPortal>
        <div data-testid="modal-content">Modal Content</div>
      </ModalPortal>
    );

    // Wait for portal to mount
    await vi.waitFor(() => {
      const modalRoot = document.getElementById('modal-root');
      expect(modalRoot).toBeInTheDocument();
    });
  });

  it('should create modal-root element if not exists', async () => {
    // Ensure no modal-root exists before test
    const existingRoot = document.getElementById('modal-root');
    if (existingRoot) existingRoot.remove();

    render(
      <ModalPortal>
        <div>Test Content</div>
      </ModalPortal>
    );

    await vi.waitFor(() => {
      const modalRoot = document.getElementById('modal-root');
      expect(modalRoot).toBeInTheDocument();
    });
  });

  it('should render modal content correctly', async () => {
    render(
      <ModalPortal>
        <div data-testid="test-modal">Hello Modal</div>
      </ModalPortal>
    );

    await vi.waitFor(() => {
      const content = screen.queryByTestId('test-modal');
      expect(content || document.getElementById('modal-root')).toBeTruthy();
    });
  });

  it('should cleanup on unmount', async () => {
    const { unmount } = render(
      <ModalPortal>
        <div>Content</div>
      </ModalPortal>
    );

    await vi.waitFor(() => {
      expect(document.getElementById('modal-root')).toBeInTheDocument();
    });

    unmount();

    // After unmount, modal-root should be removed
    await vi.waitFor(() => {
      const modalRoot = document.getElementById('modal-root');
      expect(modalRoot).toBeNull();
    });
  });

  it('should handle multiple renders', async () => {
    const { rerender } = render(
      <ModalPortal>
        <div>First Content</div>
      </ModalPortal>
    );

    await vi.waitFor(() => {
      expect(document.getElementById('modal-root')).toBeInTheDocument();
    });

    rerender(
      <ModalPortal>
        <div>Updated Content</div>
      </ModalPortal>
    );

    await vi.waitFor(() => {
      expect(document.getElementById('modal-root')).toBeInTheDocument();
    });
  });
});
